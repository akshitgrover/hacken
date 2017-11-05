const expect = require('expect');
const model = require('./../User/userModel.js');
const {mongoConnect} = require('./../index.js');
const utils = require('./../index.js');

before((done)=>{
	mongoConnect("mongodb://localhost:27017/hacken_test").then(()=>{
		done();
	});
});

describe("User Model Tests.",()=>{

	var id;
	var id2;

	beforeEach((done)=>{
		model.remove({}).then(()=>{
			var user_1 = new model({username:"akshitgrover",password:"151617",name:"akshit"});
			id = user_1._id;
			user_1.save().then((result)=>{
				utils.userCreate({username:"akshit",password:"151617"}).then(()=>{
					done();
				});
			});
		});
	});

	it("Should Check User Create.",(done)=>{

		utils.userCreate({username:'Deathadder',password:"151617"}).then((result)=>{
			id2 = result._id;
			return model.findOne({username:'Deathadder'});
		}).then((result)=>{
			expect(result).toBeTruthy();
			expect(result.password).not.toBe('151617');
			done();
		}).catch((err)=>{
			done(err);
		});

	});

	it("Should Check FindByUsername.",(done)=>{

		utils.userFindByUsername("akshitgrover").then((result)=>{
			expect(result.password).toBe("151617");
			done();
		}).catch((err)=>{
			done(err);
		})

	});

	it("Should Check FindByUsername Falsy.",(done)=>{

		utils.userFindByUsername("akshitgrove").then((result)=>{
			expect(result.password).toBe("151617");
			done();
		}).catch((err)=>{
			expect(err).toBe("No User Found.");
			done();
		})

	});

	it("Should Check FindByName.",(done)=>{

		utils.userFindByName("akshit").then((result)=>{
			expect(result[0].password).toBe("151617");
			expect(result[0].username).toBe("akshitgrover");
			done();
		}).catch((err)=>{
			done(err);
		});

	});

	it("Should Check Duplicacy Of Username.",(done)=>{

		utils.userCreate({username:"akshitgrover",password:"hello"}).then((result)=>{
			done(result);
		}).catch((err)=>{
			expect(err.errmsg).toBeTruthy();
			done();
		});

	});

	it("Should Check Required Password And Username.",(done)=>{

		utils.userCreate({username:"",password:""}).then((result)=>{
			done(result);
		}).catch((err)=>{
			expect(err.errors.password.message).toBe("Password Is Required.");
			expect(err.errors.username.message).toBe("Username Is Required.");
			done();
		});

	});

	it("Should Check LogIn.",(done)=>{

		utils.userLogin("akshit","151617").then((result)=>{
			expect(result.msg).toBe("Logged In.")
			done();
		}).catch((err)=>{
			done(err);
		})

	});

	it("Should Check User Update",(done)=>{

		utils.userUpdate("akshitgrover",{name:"akshitgr1516"}).then((result)=>{
			utils.userFindByName("akshitgr1516").then((result)=>{
				expect(result[0].name).toBeTruthy();
				done();
			})
		}).catch((err)=>{
			done(err);
		});

	});

	it("Should Check Update Of Password.",(done)=>{

		utils.userUpdate("akshitgrover",{password:"hello"}).then((result)=>{
			done(result);
		}).catch((err)=>{
			expect(err).toBe("Cannot Update Password.");
			done();
		})

	});

	it("Should Check FindById",(done)=>{

		utils.userFindById(id).then((result)=>{
			expect(result.username).toBe("akshitgrover");
			done();
		}).catch((err)=>{
			done(err);
		})

	});

	it("Should Check Invalid Id Search.",(done)=>{
		utils.userFindById("145646548").then((result)=>{
			done(result);
		}).catch((err)=>{
			expect(err).toBe("ObjectId Is Invalid.");
			done();
		});
	});

	it("Should Check User Exists.",(done)=>{

		utils.userFindById(id2).then((result)=>{
			expect(result).toBeFalsy();
			done();
		}).catch((err)=>{
			done(err);
		});

	});

	it("Should Check userRemove",(done)=>{

		utils.userRemove("deathadder").then((result)=>{
			done(result);
		}).catch((err)=>{
			expect(err).toBe("No User Found.");
			done();
		});

	});

	it("Should Remove A User.",(done)=>{

		utils.userRemove("akshitgrover").then((result)=>{
			expect(result.password).toBe("151617");
			done();
		}).catch((err)=>{
			done(err);
		});

	});


});