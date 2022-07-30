const http = require("http");
const qs = require("querystring");

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const header = req.headers["content-type"];

  if (method === "POST" && url === "/json") {
    if (header === "application/json") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const data = JSON.parse(body);
        res.end(JSON.stringify(data));
      });
    }
  } else if (method === "POST" && url === "/form") {
    if (header === "application/x-www-form-urlencoded") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        const data = qs.parse(body);
        res.end(JSON.stringify(data));
      });
    }
  }
});

server.listen(7000, () => {
  console.log("Server is running on port 7000");
});
