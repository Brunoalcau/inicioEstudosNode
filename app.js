var express = require('express'),
	app = express(),
	load = require('express-load'),
	error = require('./middleware/erro'),
	server = require('http').createServer(app),
	io    =  require('socket.io').listen(server);

io.sockets.on('connection',function(client){
	client.on('send-server',function(data){
		var msg = "<b>"+data.nome +":<b>"+data.msg+"<br />";
		client.emit('send-client',msg);
		client.broadcast.emit('send-client',msg);
	});
});


app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.use(express.cookieParser('ntalk'));
app.use(express.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname+'/public'));
app.use(error.notFound);
app.use(error.serverErro);

load('models')
	.then('controllers')
	.then('routes')
	.into(app);



server.listen(3000,function(){
	console.log('Atividade 3000');
});