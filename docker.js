const fs = require('fs');

const port = process.argv[2];
const servfile = process.argv[3];

var Dockerfile;

Dockerfile = "FROM node:boron\n\n";
Dockerfile += "WOKRDIR /app\n\n";
Dockerfile += "ADD package.json /app\n\n";
Dockerfile += "RUN npm install\n\n";
Dockerfile += "ADD . /app\n\n";
Dockerfile += "EXPOSE " + port + "\n\n";
Dockerfile += "CMD[\"node\",\"" + servfile + "\"]";

fs.writeFile("./Dockerfile",Dockerfile,(err)=>{
	console.log(err);
});