module.exports = function(app){
	var HomeControlle ={
		index:function(req,res){
			res.render('home/index');
		},
		login:function(req,res){
			var Usuario = app.models.usuario;
			var query = {
				email: req.body.usuario.email
			};
			Usuario.findOne(query)
				   .select('nome email')
				   .exec(function(err,usuario) {				   	
				   		if (usuario) {
				   			req.session.usuario = usuario;
				   			res.redirect('/contatos');
				   		} else {
				   			Usuario.create(req.body.usuario,function(err,usuario){
				   				if(err){
				   					res.redirect('/');
				   				}else{
				   					req.session.usuario = usuario;
				   					res.redirect('/contatos');
				   				}
				   			});
				   		}
				   });
		},
		logout:function(req,res){
			req.session.destroy();
			res.redirect('/');
		}
	};
	return HomeControlle;
};