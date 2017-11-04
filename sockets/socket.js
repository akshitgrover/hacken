const Room = require('./roomModel.js');
const User = require('./../User/userModel.js')

const serverFunction = (server)=>{
	const socketIO = require('socket.io');
	const io = socketIO(server);

	io.on('connect',(socket)=>{
		socket.on('init',(username,cb)=>{
			console.log(username + " Requested To Join.");
			User.findOne({username:username}).then((result)=>{
				console.log(result);
				if(!result){
					return cb("Invalid Username.");
				}
				io.emit('newUser',{msg:username + " Joined."});
			}).catch((err)=>{
				cb(err);
			});
		});

		socket.on('sendMessage',(obj,cb)=>{
			User.findOne({username:obj.username}).then((result)=>{
				if(!result || !obj.username || !obj.text || !obj.time || Object.keys(obj).length != 3){
					return cb("Invalid Details.");
				}
				Room.findOne({id:"broadcast"}).then((result_2)=>{
					var room = result_2;
					if(!result_2){
						room = new Room({id:"broadcast"});
						result.chatroom.push(room);
						result.save();
					}
					room.messages.push({username:obj.username,text:obj.text,time:obj.time});
					room.save();
					io.emit('recieveMessage',obj);
				}).catch((err)=>{
					console.log(err);
					cb(err);
				});
			}).catch((err)=>{
				console.log(err);
				cb(err);
			});
		});
	});	

}

module.exports = {

	serverFunction

}