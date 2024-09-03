import chai from "chai";
import chaiHttp from "chai-http";
import con from "../database.js";
import { app } from "../app.js";
import Bluebird from "bluebird";

chai.use(chaiHttp);
const should = chai.should();

const port = process.env.PORT || 3000;
const server = app.listen(port);

const setup = (...eventObjects) => {
  return Bluebird.mapSeries(eventObjects, (event) => {
    return chai
      .request(server)
      .post("/register")
      .send(event)
      .then((response) => {
        return response.body;
      });
  });
};

describe("Authentication Testing", function () {
  let user1 = {
    email: "test1@email.com",
    password: "xyz",
  };

  this.afterAll(async function () {
    server.close();
  });

  this.beforeAll(async function () {
    let sql = "DELETE FROM users";
    con.run(sql, (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  });

  this.afterEach(async function () {
    let sql = "DELETE FROM users";
    con.run(sql, (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  });

  it("Testing Register", async () => {
    try {
      const res = await chai.request(server).post("/register").send(user1);
      res.should.have.status(201);
    } catch (error) {
      throw new Error(error);
    }
  });

  it("If email already exists then it should not register", async () => {
    try {
      const result = await setup(user1);
      const res = await chai.request(server).post("/register").send(user1);
      res.should.have.status(401);
    } catch (error) {
      throw new Error(error);
    }
  });

  it("Testing Login with wrong credentials", async () => {
    try {
      const res = await chai.request(server).post("/login").send({ email: "wrong@email.com", password: "wrong" });
      res.should.have.status(400);
      res.body.errMsg.should.eq("incorrect email or password");
    } catch (error) {
      throw new Error(error);
    }
  });

  it("Testing Login with correct credentials", async () => {
    try {
      const result = await setup(user1);
      const res = await chai.request(server).post("/login").send({ email: "test1@email.com", password: "xyz" });
      res.should.have.status(200);
      res.body.msg.should.eq("Success");
      res.body.should.have.property("token");
    } catch (error) {
      throw new Error(error);
    }
  });
});
