let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let expect = chai.expect;
let should = chai.should();
chai.use(chaiHttp);
//Our parent block
describe("Pets", () => {
  // beforeEach((done) => {
  //     //Before each test we empty the database in your case
  //     done();
  // });
  /*
   * Test the /GET route
   */
  let url = "http://localhost:3001";
  let user = {
    email: "linh@gmail.com",
    password: "123456",
  };
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE1ODY3OGQ3ZmE3NmEyMTU2ZDUzYWUiLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTYxMjE2MjI2NSwiZXhwIjoxNjEyMjQ4NjY1fQ.CKRMoQLoGEminhgnupgsUIateWCQr8BSax_6RhQGJ_0";
  describe("Get all video", () => {
    it("Can get all video", (done) => {
      chai
        .request(url)
        .get("/api/pl/notifications/viewAll")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an("array");
          console.log(res.body.length);

          done();
        });
    });
    it("Can get all video by a user with token", (done) => {
      chai
        .request(url)
        .get("/api/pv/notifications/viewByUser")
        .set("Authorization", token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
    it("Can share a video ", (done) => {
      chai
        .request(url)
        .post("/api/pv/notifications/create")
        .set("Authorization", token)
        .send({
          url: "https://www.youtube.com/watch?v=Zuigoj-fy2o",
          receiver_by: "linh2@gmail.com",
          created_by: "",
          description: "A description",
          title: "A title",
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data).to.be.an('object');
          expect(res.body.message).to.equal('create successful');
          done();
        });
    });
  });
});
