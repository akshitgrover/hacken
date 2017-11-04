//require mongoose:
const mongoose = require('mongoose');

//jwt.js
const {issueToken} = require('./jwt.js');
const {verifyToken} = require('./jwt.js');
const {decodeToken} = require('./jwt.js');

//objectop.js
const {isObjValid} = require("./objectop.js");
const {toObjMap} = require("./objectop.js");
const {arrObjMap} = require("./objectop.js");

//userModel.js
const {userCreate} = require('./User/controller.js');
const {userUpdate} = require('./User/controller.js');
const {userLogin} = require('./User/controller.js');
const {userFindByName} = require('./User/controller.js');
const {userFindByUsername} = require('./User/controller.js');
const {userRemove} = require('./User/controller.js');
const {userFindById} = require('./User/controller.js');

//docker.js "node docker {port} {servfile}"

//mongoConnect
var mongoConnect = (url)=>{
	return new Promise((resolve,reject)=>{
		mongoose.connect(url,{useMongoClient:true},(err,db)=>{
			if(err){
				reject(err);
			}
			resolve(db);
		});
	});
}

var dockerImgCreate = (port,servfile)=>{
	const dockerImg = require('./docker.js');
	dockerImg(port,servfile,(err)=>{
		if(err){
			console.log(err);
			return;
		}
		console.log("Dockerfile Created.");
	});
}

dockerImgCreate("3000","app");

module.exports = {

	//token
	issueToken,
	verifyToken,
	decodeToken,

	//object
	isObjValid,
	toObjMap,
	arrObjMap,
	
	//user
	userCreate,
	userRemove,
	userLogin,
	userUpdate,
	userFindByUsername,
	userFindByName,
	userFindById,
	
	//MongoDb Connection
	mongoConnect,

	//Dockerfile
	dockerImgCreate

}