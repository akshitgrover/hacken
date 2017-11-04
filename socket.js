const server = (server)=>{
	const io = socketIO(server);

	io.on('connection',(socket)=>{
		socket.on('init',(username,cb)=>{
			console.log(username + "Joined.");
			cb();
		});

		socket.on('newMessage',(obj,cb)=>{
			socket.broadcast.to(obj.id).emit()
		});
	});
	
}