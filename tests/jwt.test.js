const utils = require('./../index.js');
const expect = require('expect');

describe("Json Web Token Checks.",()=>{

	var token;

	it("Should Sign A Jwt.",(done)=>{

		utils.issueToken({user:"akshit"},"secret","5d").then((result)=>{
			token = result;
			expect(result).toBeTruthy();
			done();
		}).catch((err)=>{
			done(err);
		});

	});

	it("Should Verify A Jwt.",(done)=>{

		utils.verifyToken(token,"secret").then((result)=>{
			expect(result.msg).toBe("Token Is Valid.");
			expect(result.decoded).toMatchObject({user:"akshit"});
			done();
		}).catch((err)=>{
			done(err);
		});

	});

	it("Should Decode A Token.",(done)=>{

		utils.decodeToken(token).then((result)=>{
			expect(result.payload).toMatchObject({user:"akshit"});
			done();
		}).catch((err)=>{
			done(err);
		})

	});


});

