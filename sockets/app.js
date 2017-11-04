const express = require('express');
const app = express();
const http = require('http');
const {serverFunction} = require('./socket.js');
const path = require('path');
const {mongoConnect} = require('./../index.js');

const server = http.createServer(app);

app.set('views',path.join(__dirname + '/views'));
app.set('view engine','ejs');


app.get('/',(req,res)=>{
	res.render('index');
});
mongoConnect("mongodb://localhost:27017/node_playground",()=>{
	
});



serverFunction(server);

server.listen(3000);