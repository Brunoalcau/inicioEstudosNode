module.exports = function (io) {
	var crypto = require('crypto'),		
		sockets = io.sockets;
	sockets.on('connection',function(client){
		var session = client.handshake.session,
			usuario = session.usuario;		
		
		client.on('join',function(sala){
			console.log(sala);
			if(sala){
				sala = sala.replace('?','');
			}else{
				var timestamp = new Date().toString(),
					md5 = crypto.createHash('md5');
				sala = md5.update(timestamp).digest('hex');
			}			
			client.set('sala',sala);
			client.join(sala);
		});

		client.on('create-chat',function(){
			client.get('sala',function(err,sala){
				var data = {email:usuario.email,sala:sala}
				client.broadcast.emit('new-message',data);
			});
		});

		client.on('send-server',function(data){			
			var msg = '<b>'+ usuario.nome + ':</b>' + data.msg +'<br />'
			client.get('sala',function(err,sala){				
				sockets.in(sala).emit('send-client',msg);
			});			
		});	
		client.on('disconnect',function(){
			client.get('sala',function(erro,sala){
				client.leave(sala);
			});
		});
	});
}