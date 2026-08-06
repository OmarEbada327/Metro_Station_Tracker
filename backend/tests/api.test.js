const assert = require("assert");
const http = require("http");

const request = (options, postData) =>
  new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    });

    req.on("error", reject);

    if (postData) {
      req.write(postData);
    }

    req.end();
  });

describe("API smoke tests", () => {
  it("should return 404 for unknown routes", async () => {
    const { statusCode } = await request({
      hostname: "127.0.0.1",
      port: 3000,
      path: "/unknown",
      method: "GET",
    });

    assert.strictEqual(statusCode, 404);
  });
});
