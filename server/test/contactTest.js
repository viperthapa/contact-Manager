const chai = require("chai");
const request = require("supertest");
const should = chai.should();
const config = require("../config/auth");

let server = require("../index");

const Contact = require("../models/contact");
const User = require("../models/user");

describe("Contact Api", function () {
  it("get contacts", function (done) {
    request(server)
      .set("Authorization", "Bearer " + config.secret) //set the header first
      .get("/api/contacts")
      .expect(200, done);
  });
});

/*
 * Test the /api/user/ route
 */
describe("GET /api/contacts/", function () {
  it("get all the contacts", function (done) {
    request(server)
      .set("Authorization", "Bearer " + config.secret) //set the header first
      .get("/api/contacts")
      .expect(200, done);
  });
});
