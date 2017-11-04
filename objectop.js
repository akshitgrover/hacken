const mongoose = require('mongoose');
const _ = require('lodash');
const ObjectId = mongoose.Types.ObjectId;

var isObjValid = function(id){
	if(ObjectId.isValid(id)){
		return true;
	}
	else{
		return false;
	}
}

var toObjId = function(id){

	try{
		return ObjectId(id);
	}
	catch(err){
		return {err:"ObjectId Is Not Valid."}; 
	}

}

var arrObjMap = function(arr,prop){

	if(!arr || !prop){
		throw Error({err:"Incomplete Details."});
	}
	var arr = arr.map((inst)=>{
		var res = [];
		for(var i=0;i<prop.length;i++){
			res.push(inst[prop[i]]);
		}
		return res;
	});
}

module.exports = {

	isObjValid,
	toObjId,
	arrObjMap

}