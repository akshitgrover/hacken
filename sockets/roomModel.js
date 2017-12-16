const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var room = new Schema({

	id:{
		type:'string',
		required:true
	},
	messages:[{
		username:{
			type:'string'
		},
		text:{
			type:'string'
		},
		time:{
			type:'string'
		}	
	}]

});

var model = mongoose.model('chatRoom',room);

module.exports = model;
