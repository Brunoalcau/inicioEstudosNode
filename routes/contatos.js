module.exports = function(app){
	var contatos = app.controllers.contatos,
		autetificar = require('./../middleware/autentificacao');
	app.get('/contatos',autetificar,contatos.index);
	app.get('/contato/:id',autetificar,contatos.show);
	app.post('/contato',autetificar,contatos.create);
	app.get('/contatos/:id/edit',autetificar,contatos.edit);
	app.put('/contato/:id',autetificar,contatos.update);
	app.del('/contato/:id',autetificar,contatos.destroy);
}