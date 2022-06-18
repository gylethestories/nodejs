const request = require("supertest");
const app = require("../app");

describe("#test koa app", () => {
  let server = app.listen(3000);
  describe("#test server", () => {
    it("#test GET /", async () => {
      await request(server)
        .get("/")
        .expect("Content-Type", /text\/html/)
        .expect(200, "<h1>hello world</h1>");
    });

    after(function () {
      server.close();
    });
  });
});
