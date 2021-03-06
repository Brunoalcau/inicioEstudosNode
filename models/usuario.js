module.exports = function(app){

	var Schema = require('mongoose').Schema,
		contato = Schema({
			nome:'String',
			email:'String',
			chat:{
				type:'String',
				unique:true
			},
		}),
		usuario = Schema({
			nome :{
				type:'String',
				required:true
			},
			email:{
				type:'String',
				required:true,
				index:{
					unique:true
				}
			},
			contatos:[contato],
		});
		return db.model('usuario',usuario);
	};