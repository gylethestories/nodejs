var fs = require("fs").promises;
var chai = require("chai");
var expect = chai.expect;
it("test async function", async function () {
  const data = await fs.readFile("./1.txt", "utf8");
  expect(data).to.equal("hello");
});
