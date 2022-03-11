const chai = require("chai");
// const chaiHttp = require('chai-http');
const request = require('supertest');
const should = chai.should();
const config = require("../config/auth");

//import a server
let server = require('../index');

// Import Model
var Contact = require("../models/contact");
var User = require("../models/user");

console.log("token",config.secret)

// describe('Contact Api',function(){
//     it("get contacts",function(done){
//         request(server)
//         .set('Authorization', 'Bearer ' + config.secret)        //set the header first
//         .get('/api/contacts')
//         .expect(200, done);

//         });

// })


/*
  * Test the /api/user/ route
*/
describe("GET /api/contacts/",function(){
    it("get all the contacts",function(done){
        request(server)
        .set('Authorization', 'Bearer ' + config.secret)        //set the header first
        .get('/api/contacts')
        .expect(200,done)
    });
})
