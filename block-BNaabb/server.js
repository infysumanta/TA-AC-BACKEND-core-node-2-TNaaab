const http = require("http");

const server = http.createServer((req, res) => {
  let store = "";
  if (req.method === "POST" && req.url === "/") {
    req.on("data", (data) => {
      store = store + data;
    });
    req.on("end", () => {
      console.log(store);
    });
    res.write(store);
    res.end();
  }
});

server.listen(3456, () => {
  console.log("Server is running on port 3456");
});
