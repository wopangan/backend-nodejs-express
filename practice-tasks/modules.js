// Sample codes
// modules -> http, fs, os, path, util, url, and querystring

// http module to create an instance of a server.
let http = require("http");
http
  .createServer(function (req, res) {
    res.writeHead(200); // Ok status
    res.end("hello from server"); 
  })
  .listen(3000); //the server instance listens for http requests on port 3000; can also declare a variable named const PORT = 3000 and insert PORT instead

// fs module to read local files asynchronously
const fs = require("fs");

fs.readFile("sample.text", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});
// with input and output, or known as I/O
fs.writeFileSync("content.md", "# Hello WORLD!!!");
const data = fs.readFileSync("./content.md", "utf8");
console.log(data);

// os module to retrieve information from the operating system that the application is running and interact with.
let os = require("os");
console.log("Computer OS Platform Info: " + os.platform());
console.log("Computer OS Architecture Info: " + os.arch());

// path module to retrive and manipulate directory and file paths.
const path = require("path");
let result = path.basename("/content/index/home.html");
console.log(result);

// util module for internal use and accomplishing such tasks as debugging and deprecating functions.
// example: say you want to debug a program to count the number of iterations in a loop:
let util = require("util");
let str = "The loop has executed %d time(s).";

for (let i = 1; i <= 10; i++) {
  console.log(util.format(str, i));
}

// url module to divide up a web address into readable parts.
const url = require("url");
// sample url with query parameters
let webAddress = "http://localhost:2000/index.html?lastName=Doe&firstName=John";
let parsedUrl = url.parse(webAddress, true);
let queryData = parsedUrl.query;
console.log(queryData);

// querystring module provides methods to parse through the query string of a URL.
let qry = require("querystring");
let queryParams = qry.parse("lastName=Doe&firstName=John");
console.log(queryParams.firstName);
