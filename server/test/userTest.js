let mongoose = require("mongoose");
const request = require("supertest");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
chai.use(chaiHttp);

/*
 * Test the /api/user/ route
 */
describe("GET /user/", function () {
  it("get all the user", function (done) {
    request(server).get("/api/user").expect(200, done);
  });
});

/*
 *Test the api/register/ route
 */
describe("POST /user/", function () {
  it("Add a user", function (done) {
    let user = {
      name: "test",
      email: "test@gmail.com",
      password: "shrestha",
    };
    request(server).post("/api/register").send(user).expect(201, done);
  });

  it("Should not add a user as email is already exist", function (done) {
    let user = {
      name: "test",
      email: "test@gmail.com",
      password: "shrestha",
    };
    request(server).post("/api/register").send(user).expect(409, done);
  });

  it("Should not add a user without email field", function (done) {
    let user = {
      name: "test",
      password: "shrestha",
    };
    request(server).post("/api/register").send(user).expect(400, done);
  });
});

/*
 *Test the api/login/ route
 */
describe("POST /login/", function () {
  it("Login a user", function (done) {
    let user = {
      email: "madanrtha12@gmail.com",
      password: "shrestha",
    };
    request(server).post("/api/login").send(user).expect(200, done);
  });

  it("Should not login a user without wrong email and password", function (done) {
    let user = {
      email: "madanrtha122@gmail.com",
      password: "shrestha",
    };
    request(server).post("/api/login").send(user).expect(404, done);
  });
});
