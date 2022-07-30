//Capture data on server

// Q. Create a server using http
// - handle post method on '/' route
// - send json data on it from postman

// ```js
// // data format is
// {
//   team: 'kxip',
//   players: 18,
//   captain: 'KL Rahul'
// }
// ```
// - capture data from request on server side using data and end event on request object
// - when end event fires, send entire captured data in response with status code 201.
// Q. Follow above steps with form data from postman instead of json data.
// once data has been captured, send only captain's name in response.

const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  let header = req.headers["content-type"];
  if (header === "application/x-www-form-urlencoded") {
    if (req.url === "/" && req.method === "POST") {
      let store = "";
      req.on("data", (chunk) => {
        store += chunk;
      });
      req.on("end", () => {
        res.statusCode = 201;
        var parsedData = querystring.parse(store);
        res.end(JSON.stringify(parsedData.captain));
      });
    }
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
