module.exports = function(app){
	var ContatosController = {
		index :function(req,res){
			var usuario = req.session.usuario,
				contatos = usuario.contatos,
			param = {usuario:usuario, contatos:contatos};

			res.render('contatos/index',param);
		},
		create : function(req,res){
			var usuario = req.session.usuario,
				contato = req.body.contato;
				console.log(contato);
				usuario.contatos.push(contato);
			res.redirect('/contatos');
		},
		show :function(req, res){
			var  id =req.param.id,
				 contato = req.session.usuario.contatos[id],
				 param = {contato:contato,id:id};

			res.render('/contatos/show',param);
		},
		edit :function(req,res){
			var id =req.param.id,
				contatos = req.session.usuario
				contato = usuario.contatos[id],
				param =
				{
					usuario:usuario,
					contato:contato,
					id:id
				}
			res.render('/contato/:id/edit',param);
		},
		update : function(req,res){
			var contato = req.body.contato;
			req.session.usuario.contatos[req.param.id] =contato;
			res.render('/contatos');
		},
		destroy:function(req,res){
			var usuario = req.session.usuario,
				id = req.para.id;
			usuario.contatos.splice(id,1);
			res.render('/contatos');
		}
	};
	return ContatosController;
};