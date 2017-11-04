var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var {validate} = require('email-validator'); 

mongoose.Promise = global.Promise;

var flag = new Schema({

	username:{
		type:'string',
		required:[true,"Username Is Required."]
	},
	password:{
		type:'string',
		required:[true,"Password Is Required."]
	},
	phoneno:{
		type:'string'
	},
	email:{
		type:'string',
		validate:{
			validator: (value) => validate(value),
			message:"Email Is Invalid"
		}
	},
	name:{
		type:'string'
	},
	age:{
		type:'string'
	},
	address:{
		type:'string'
	},
	chatroom:[{
		type:Schema.Types.ObjectId,
		ref:'chatRoom'
	}]

});

flag.methods.hashAndSave = function(){
	this.password = bcrypt.hashSync(this.password);
	return this.save();
}

flag.statics.compare = function(username,password){
	return new Promise((resolve,reject)=>{
		this.findOne({username:username}).then((result)=>{
			if(!bcrypt.compareSync(password,result.password)){
				reject("Invalid Username/Password.");
			}
			resolve("Authorized");
		}).catch((err)=>{
			reject("Soemthing Went Wrong.")
		});
	});
}

var model = mongoose.model('user',flag);

module.exports = model;