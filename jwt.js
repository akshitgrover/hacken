const jwt = require('jsonwebtoken');

var issueToken = (data,secret,time)=>{
	if(!data || !secret || !time){
		throw Error({err:"Incomplete Details."});
	}
	return new Promise((resolve,reject)=>{
		jwt.sign(data,secret,{expiresIn:time},function(err,token){
			if(err){
				reject(err);
			}
			resolve(token);
		});
	});
}

var verifyToken = (token,secret)=>{
	if(!token || !secret){
		throw Error({err:"Incomplete Details."});
	}
	return new Promise((resolve,reject)=>{
		jwt.verify(token,secret,function(err,data){
			if(err){
				reject(err);
			}
			resolve({msg:"Token Is Valid.",decoded:data});
		});
	});
}

var decodeToken = (token)=>{
	if(!token){
		throw Error({err:"Incomplete Details."});
	}
	var decoded = jwt.decode(token,{complete:true});
	return new Promise((resolve,reject)=>{
		resolve(decoded);
	});
}

module.exports = {
	issueToken,
	verifyToken,
	decodeToken,
}