# What is hacken?

Hacken is a node module to help people in hackathons, it has almost all the common features a person needs from database operations to sockets. If you are the one who struglles with MongoDb ObjectId, hacken makes it easier to work with then too.

## Contents
* [Object Functions](#object)
* [JWT Functions](#jwt)
* [MongoDb Connection](#mongoconnect)
* [User Functions](#usermodel)
* [Create Docker Image](#docker)
* [Socket Function](#sockets)

--------------------------------

<a name="object"></a>

## Object Functions

### isObjValid

To Check if ObjectId is valid.
```javascript
var hacken = require('hacken');

if(hacken.isObjValid(objid)){
	console.log("Valid.");
}
else{
	console.log("Invalid.");
}
```

### toObjId

To convert a ObjectId string to underlying ObjectId.

```javascript
var hacken = require('hacken');

try{
	var objid = hacken.toObjId(req.body.id);
}
catch(e){
	console.log(e.err);
}
```

### arrObjMap

To get some specific values of properties from an array of objects.

```javascript
var hacken = require('hacken');

var arr = [{ele1:"one",ele2:"two"},{ele1:"1",ele2:"2"}];

var prop = ["ele1"]; //specify properties which you want to get from an array.

var res = hacken.arrObjMap(arr,prop); //res = ["one","1"];
```
-------------------

<a name="jwt"></a>

## JWT Functions

### issueToken

To Issue A Json Web Token.

```javascript
var hacken = require('hacken');

var data = "hello hacken";

var secret = "adsasdAFD5454asdasd5Basasdajsdb46555654d656464N15465as4d6546546a";

var time = "5d"; //time can be given in 'd' for days without any suffix means seconds eg: 1100 for 1100 seconds.

try{
	hacken.issueToken(data,secret,time).then((token)=>{
		console.log(token);
	},(err)=>{
		console.log(err);
	});
}
catch(e){
	console.log(e);
}
```

### verifyToken

To Verify a Json Web Token.

```javascript
var hacken = require('hacken');

var token = req.params.token;

var secret = "adsasdAFD5454asdasd5Basasdajsdb46555654d656464N15465as4d6546546a"; //same as the one provided before.

try{
	hacken.verifyToken(token,secret).then((result)=>{

		var msg = result.msg;
		var decodedData = result.decoded
		console.log(msg);
		console.log(decodedData);

	}).catch((err)=>{
		console.log(err);
	})
}
catch(e){
	console.log(e);
}
```

### decodeToken

To Decode the token.

```javascript
var hacken = require('hacken');

try{
	hacken.decodeToken(token).then((res)=>{
		console.log(res);
	},(err)=>{
		console.log(err);
	});
}
catch(err){
	console.log(err);
}
```
-------

<a name="mongoconnect"></a>

## MongoDb Connection

### mongoConnect

To Connect To MongoDb.

```javascript
var hacken = require('hacken');

var url = "mongodb://localhost:27017/db"; //replace with your url 

hacken.mongoConnect(url).then((msg)=>{
	console.log(msg);
}).catch((err)=>{
	console.log(err);
})
```

--------

<a name="usermodel"></a>

## User Functions

Following Properties Are allowed in User Model:

* username
* password
* phoneno
* email
* name
* age
* address

```javascript
var object = {username:"value",password:"value",phoneno:"value",email:"value",name:"value",age:"value",address:"value"};

//These objects can also take subset of the above mentioned properties.

//Example:

var object = {username:"value",password:"value",phoneno:"value"};
```

### userCreate

To Create The User.

```javascript
var hacken = require('hacken');

hacken.userCreate(object).then((result)=>{
	console.log(result);
}).catch((err)=>{
	console.log(err);
});
```

### userRemove

To Remove the user.

```javascript
var hacken = require('hacken');

hacken.userRemove(req.body.username).then((result)=>{
	console.log(result);
}).catch((err)=>{
	console.log(err);
});
```

### userLogin

To Log user in.

```javascript
var hacken = require('hacken');

hacken.userLogin(username,password).then((result)=>{
	console.log(result);
}).catch((err)=>{
	console.log(err);
});
```

### userUpdate

To Update The User, Requires the same object with properties as used while creating the user.

```javascript
var hacken = require('hacken');

//Do Not Provide Password While updating as passwords are encrypted while storing.

hacken.userUpdate(username,object).then((result)=>{
	console.log(result);
}).catch((err)=>{
	console.log(err);
});
```

### userFindByUsername

To Find the user by username.

```javascript
var hacken = require('hacken');

hacken.userFindByUsername(username).then((result)=>{
	console.log(result);
}).catch((err)=>{
	console.log(err);
});
```

### userFindByName

To Find users by name.

```javascript
var hacken = require('hacken');

hacken.userFindByName(name).then((result)=>{
	console.log(result); //result is an array of users.
}).catch((err)=>{
	console.log(err);
});
```

### userFindById

To Find user by ObjectId.

```javascript
var hacken = require('hacken');

hacken.userFindById(object).then((result)=>{
	console.log(result);
}).catch((err)=>{
	console.log(err);
})
```

### msgFind

To Fetch messages of a room. //For Now roomid = "broadcast".

```javascript
var hacken = require('hacken');

hacken.msgFind("broadcast").then((result)=>{
	console.log(result);
}).catch((err)=>{
	console.log(err);
});
```

### roomFind

To Find all the chatrooms a user is associated to.

```javascript
var hacken = require('hacken');

var username = req.body.username;

var page = req.body.pagenum; //to paginate the response as there can be many chat rooms for a user.

var length = req.body.numrooms; //to specify the number of chatrooms per page.

hacken.roomFind(username,page,length).then((result)=>{
	console.log(result); //Array of roomIds.
}).catch((err)=>{
	console.log(err);
});
```

---------

<a name="docker"></a>

## DockerImage

### dockerImgCreate

To Create a dockerimage for your project, Dockerimage will be created in your root directory.

```javascript
var hacken = require('hacken');

var port = 3000; //port on which your node server will run.

var servfile = app.js; //your start file.

hacken.dockerImgCreate(port,servfile,(err)=>{
	if(err){
		console.log(err);
	}
	else{
		console.log("Docker File Created.");
	}
})
```

-----------

<a name="sockets"></a>

## Socket Functions

For Now hacken only supports group chat.

### socketFunction

To Create socket server, call the below function in your start file.

```javascript
var hacken = require('hacken');

var app = require('express')();

var http = require('http');

var server = http.Server(app);

hacken.socketFunction(server);

server.listen(3000);
```
-----------------