module.exports = function (io) {
	var crypto = require('crypto'),	
		redis = require('redis').createClient(),	
		sockets = io.sockets;
	sockets.on('connection',function(client){		
		var session = client.handshake.session,
			usuario = session.usuario;		

		client.set('email',usuario.email);
		var onlines = sockets.clients();

		onlines.forEach(function(online){
			online = sockets.sockets[online.id];
			online.get('email',function(err,email){
				client.emit('notify-onlines',email);
				client.broadcast.emit('notify-onlines',email);
			});
		});
		
		client.on('join',function(sala){			
			if(sala){
				sala = sala.replace('?','');
			}else{
				var timestamp = new Date().toString(),
					md5 = crypto.createHash('md5');
				sala = md5.update(timestamp).digest('hex');
			}			
			client.set('sala',sala);
			client.join(sala);

			var msg = '<b>'+ usuario.nome + ':</b>Entrou<br>';

			redis.lpush(sala,msg,function(erro,res){
				redis.lrange(sala,0,-1,function(erro,msgs){
					msgs.forEach(function(msg){
						sockets.in(sala).emit('send-client',msg);
					});
				});
			});
		});

		client.on('create-chat',function(){			
			client.get('sala',function(err,sala){				
				var data = {
					email:usuario.email,
					sala:sala
				};
				client.broadcast.emit('new-chat',data);
			});
		});

		client.on('send-server',function(data){			
			var msg = '<b>'+ usuario.nome + ':</b>' + data.msg +'<br />';
			client.get('sala',function(err,sala){				
				client.broadcast.emit('new-message',usuario.email);
				sockets.in(sala).emit('send-client',msg);
			});			
		});	

		client.on('disconnect',function(){
			client.get('sala',function(erro,sala){
				client.broadcast.emit('notify-offline',usuario.email);
				client.leave(sala);
			});
		});
	});
};