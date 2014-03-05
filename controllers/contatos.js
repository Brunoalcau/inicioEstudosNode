module.exports = function(app){
	var ContatosController = {
		index :function(req,res){
			var usuario = req.session.usuario,
				contatos = usuario.contatos,
			params = {usuario:usuario, contatos:contatos};

			res.render('contatos/index',params);
		},
		create : function(req,res){
			var usuario = req.session.usuario,
				contato = req.body.contato;
				usuario.contatos.push(contato);
			res.redirect('/contatos');
		},
		show :function(req, res){
					
			var  id = req.params.id,
				 contato = req.session.usuario.contatos[id],
				 params = {contato:contato,id:id};				 
			res.render('contatos/show',params);

		},
		edit :function(req,res){
			var id =req.param.id,
				contatos = req.session.usuario
				contato = usuario.contatos[id],
				params =
				{
					usuario:usuario,
					contato:contato,
					id:id
				}
			res.render('contato/:id/edit',params);
		},
		update : function(req,res){
			var contato = req.body.contato;
			req.session.usuario.contatos[req.param.id] =contato;
			res.render('/contatos');
		},
		destroy:function(req,res){
			var usuario = req.session.usuario,
				id = req.params.id;
			usuario.contatos.splice(id,1);
			res.redirect('/contatos');
		}
	};
	return ContatosController;
};