exports.notFound = function(req,res,next){
	res.status(404);
	res.render('not-found');
}

exports.serverErro = function(error,req,res,next){
	res.status(500);
	res.render('server-erro',{error:error});
}