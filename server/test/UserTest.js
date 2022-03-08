
const { request } = require("./CommonTest")

/************************************
 * keyword:mocha = function used to group similar test 
 * keyword:it = helps to interact the module functions and use assert library 
 * 
 ************************************/

const apiBase = "localhost:5000/api/"

describe("#AUth API",() => {

    const newUser = {"name":"test","email":"test@gmail.com","password":"shrestha"};
    console.log("new user",newUser)
    it("should create a new user",() =>{
        return request.post(apiBase+"register").send(newUser).expect(200).then(res => {    
            res.body.success.should.be.true
        });
    });

})