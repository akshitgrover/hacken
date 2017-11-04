const model = require('./userModel.js');
const {isObjValid} = require('./../objectop.js');
const mongoose = require('mongoose');

var userCreate = (object)=>{
	return new Promise((resolve,reject)=>{
		model.create(object).then((result)=>{
			return result.hashAndSave();
		}).then((user)=>{
			resolve(user);
		}).catch((err)=>{
			reject("Error.");
		});
	});
}

var userFindByUsername = (username)=>{
	return new Promise((resolve,reject)=>{
		model.findOne({username:username}).then((result)=>{
			if(!result){
				reject("No User Found.");
			}
			resolve(user);
		}).catch((err)=>{
			reject("Error.");
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
			reject("Something Went Wrong.");
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
		model.findOneAndUpdate({username:username},object).then((result)=>{
			if(!result){
				reject("Invalid Username.");
			}
			resolve({msg:"Updated",user:result});
		}).catch((err)=>{
			reject("Error.");
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
			reject("Error.");
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
			reject("Error.");
		});
	})
}



module.exports = {

	userCreate,
	userUpdate,
	userLogin,
	userFindByName,
	userFindByUsername,
	userRemove,
	userFindById,

}
