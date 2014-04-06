module.exports = function(app){
	var Usuario = app.models.usuario;
	var ContatosController = {
		index :function(req,res) {
				var _id = req.session.usuario._id;
				Usuario.findById(_id,function(err, usuario){					
					var contatos = usuario.contatos,
						resul = { contatos: contatos };
					res.render('contatos/index',resul);
				});			
		},
		create : function(req,res) {
			var _id = req.session.usuario._id;
			Usuario.findById(_id,function(err, usuario){
				var contato = req.body.contato;
				usuario.contatos.push(contato);
				usuario.save(function(){
					res.redirect('/contatos');
				});
			});
		},
		show :function(req, res) {					
			var  _id = req.session.usuario._id;
			Usuario.findById(_id,function(err,usuario){
				var contatoId = req.params.id,
					contato = usuario.contatos.id(contatoId),
					result = { 
						contato:contato 
					};
				res.render('contatos/show',result);		
			});				 

		},
		edit :function(req,res){
			var _id = req.session.usuario._id;			
			Usuario.findById(_id,function(err,usuario){
				var contatoId = req.params.id,
					contato = usuario.contatos.id(contatoId),
					result = {contato:contato};
				res.render('contatos/edit',result);
			});
			
		},
		update : function(req,res){
			var _id = req.session.usuario._id;
			Usuario.findById(_id, function(err,usuario){
				var contatoId = req.params.id,
					contato = usuario.contatos.id(contatoId);
				contato.nome  = req.body.contato.nome;
				contato.email  = req.body.contato.email;
				usuario.save(function(){
					res.redirect('/contatos');
				});
			});

		},
		destroy:function(req,res){
			var _id = req.session.usuario._id;
			Usuario.findById(_id,function(err,usuario){
				var contatoId = req.params.id;
					usuario.contatos.id(contatoId).remove();
					usuario.save(function(){
						res.redirect('/contatos');
					});
			});
		}
	};
	return ContatosController;
};