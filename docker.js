const fs = require('fs');

var Dockerfile;

var create = (port,servfile,cb)=>{
	Dockerfile = "FROM node:boron\n\n";
	Dockerfile += "WOKRDIR /app\n\n";
	Dockerfile += "ADD package.json /app\n\n";
	Dockerfile += "RUN npm install\n\n";
	Dockerfile += "ADD . /app\n\n";
	Dockerfile += "EXPOSE " + port + "\n\n";
	Dockerfile += "CMD[\"node\",\"" + servfile + "\"]";

	fs.writeFile("./../../Dockerfile",Dockerfile,(err)=>{
		if(err){
			return cb(err);
		}
		cb();
	});
}

module.exports = create;