// Import the HTTP module
const http = require("http");

// Import the 'today' module
const today = require("./today");

// Define the request listener function
const requestListener = function (req, res) {
  res.writeHead(200); // Set the status code to 200 (OK)

  // greet user depending on the time of the day.
  const dateVal = today.getDate();
  const hour = dateVal.getHours();
  const formattedTime = dateVal.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  let greeting = "It is still not morning";
  if (hour > 6 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else if (hour >= 18 && hour < 24) {
    greeting = "Good evening";
  } else {
    greeting = "Go to sleep";
  }

  // Send the response with the current time from the 'today' module
  res.end(`Hello! ${greeting}! It is ${formattedTime} server time`);
};

// Create port, start the server, and listen on the specified port
const port = 8080;
const server = http.createServer(requestListener);

server.listen(port);
console.log("Server listening on port: " + port);
