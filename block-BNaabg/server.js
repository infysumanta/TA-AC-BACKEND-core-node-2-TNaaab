const http = require("http");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");
const url = require("url");

const userPath = path.join(__dirname, "users/");

const server = http.createServer(handleRequest);
function handleRequest(req, res) {
  let parsedUrl = url.parse(req.url, true);
  let url = parsedUrl.pathname;

  let store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });

  req.on("end", () => {
    if (url === "/users" && req.method === "GET") {
      let username = parsedUrl.query.username;
      fs.readFile(userPath + username + ".json", (err, content) => {
        if (err) return console.log(err);
        res.setHeader("Content-Type", "application/json");
        return res.end(content);
      });
    } else if (url === "/users" && req.method === "POST") {
      let username = parsedUrl.query.username;
      fs.open(userPath + username + ".json", "wx", (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
            return res.end(`${username} created successfully`);
          });
        });
      });
    } else if (url === "/users" && req.method === "PUT") {
      let username = parsedUrl.query.username;
      fs.open(userPath + username + ".json", "r+", (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(fd, () => {
              return res.end(`${username} updated successfully`);
            });
          });
        });
      });
    } else if (url === "/users" && req.method === "DELETE") {
      let username = parsedUrl.query.username;
      fs.unlink(userPath + username + ".json", (err) => {
        if (err) return console.log(err);
        return res.end(`${username} deleted successfully`);
      });
    } else {
      res.statusCode = 404;
      res.end("Page not found");
    }
  });
}

server.listen(3000, function () {
  console.log("Server started at http://localhost:3000");
});
