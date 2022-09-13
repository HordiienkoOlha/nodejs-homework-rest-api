const mongoose = require("mongoose");
const request = "supertest";
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_TEST_HOST, PORT } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("test login route", async () => {
    const newUser = {
      email: "olha@gmail.com",
      password: "qwe123",
    };
    const user = await User.create(newUser);
    const loginUser = {
      email: "olha@gmail.com",
      password: "qwe123",
    };

    const responce = await request(app).post("/auth/login").send(loginUser);
    expect(responce.statusCode).toBe(200);
    const { body } = responce;
    expect(body.token).toByTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });
});
