const model = require('./userModel.js');
const roomModel = require('./../sockets/roomModel.js');
const {isObjValid} = require('./../objectop.js');
const mongoose = require('mongoose');

var userCreate = (object)=>{
	return new Promise((resolve,reject)=>{
		model.create(object).then((result)=>{
			return result.hashAndSave();
		}).then((user)=>{
			resolve(user);
		}).catch((err)=>{
			reject(err);
		});
	});
}

var userFindByUsername = (username)=>{
	return new Promise((resolve,reject)=>{
		model.findOne({username:username}).then((result)=>{
			if(!result){
				reject("No User Found.");
			}
			resolve(result);
		}).catch((err)=>{
			reject(err);
		})
	});
}

var userFindByName = (name)=>{

	return new Promise((resolve,reject)=>{
		model.find({name:name}).then((result)=>{
			if(result.length == 0){
				reject("No User Found.");
			}
			resolve(result);
		}).catch((err)=>{
			reject(err);
		});
	});
}

var userLogin = (username,password)=>{
	return new Promise((resolve,reject)=>{
		model.compare(username,password).then((result)=>{
			resolve({user:result,msg:"Logged In."});
		}).catch((err)=>{
			reject(err);
		});
	});
}

var userUpdate = (username,object)=>{
	return new Promise((resolve,reject)=>{
		if(object.password){
			reject("Cannot Update Password.");
		}
		model.findOneAndUpdate({username:username},object).then((result)=>{
			if(!result){
				reject("Invalid Username.");
			}
			resolve({msg:"Updated",user:result});
		}).catch((err)=>{
			reject(err);
		});
	});
}

var userFindById = (id)=>{
	return new Promise((resolve,reject)=>{
		if(!isObjValid(id)){
			reject("ObjectId Is Invalid.");
		}
		model.findById(id).then((result)=>{
			resolve(result);
		}).catch((err)=>{
			reject(err);
		})
	});
}

var userRemove = (username)=>{
	return new Promise((resolve,reject)=>{
		model.findOneAndRemove({username:username}).then((result)=>{
			if(!result){
				reject("No User Found.");
			}
			resolve(result);
		}).catch((err)=>{
			reject(err);
		});
	})
}

var roomFind = (username,page,length)=>{
	return new Promise((resolve,reject)=>{
		model.findOne({username:username}).populate({path:'chatroom',select:'id -_id',options:{limit:length,skip:length*(page-1)}}).then((result)=>{
			console.log(result);
			if(!result){
				reject("Invalid Username.");
			}
			resolve(result);
		}).catch((err)=>{
			console.log(err);
			reject("Couldn't Pass The Query. Check Page, Length, Username Parameters.");
		});
	});
}

var msgFind = (room)=>{
	return new Promise((resolve,reject)=>{
		roomModel.findOne({id:room},{messages:1,_id:0}).then((result)=>{
			if(!result){
				reject("Invalid RoomId.");
			}
			resolve(result);
		}).catch((err)=>{
			reject("Couldn't Padd The Parameters.");
		});
	});
}

module.exports = {

	userCreate,
	userUpdate,
	userLogin,
	userFindByName,
	userFindByUsername,
	userRemove,
	userFindById,
	roomFind,
	msgFind

}
