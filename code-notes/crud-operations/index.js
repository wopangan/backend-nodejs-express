const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const routes = require('./router/friends.js')

let users = [];

// You need to provide a manner in which it can be checked to see if the username exists in the list of registered users, 
// to avoid duplications and keep the username unique. 
// This is a utility function and not an endpoint.

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

// You will next check if the username and password match what you have in the list of registered users. 
// It returns a boolean depending on whether the credentials match or not. 
// This is also a utility function and not an endpoint.

// Check if the user with the given username and password exists
const authenticatedUser = (username, password) => {
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

const app = express();

// You will now create and use a session object with user-defined secret, 
// as a middleware to intercept the requests and ensure that the session is valid before processing the request.

app.use(session({secret:"your_session_secret_here"},resave=true,saveUninitialized=true));

app.use(express.json());


// You will now ensure that all operations restricted to auhtenticated users are intercepted by the middleware. 
// The following code ensures that all the endpoints starting with /friends go through the middleware. 
// It retrieves the authorization details from the session and verifies it. 
// If the token is validated, the user is aunteticated and the control is passed on to the next endpoint handler. 
// If the token is invalid, the user is not authenticated and an error message is returned.

// Middleware to authenticate requests to "/friends" endpoint
app.use("/friends", function auth(req, res, next) {
    // Check if user is logged in and has valid access token
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken'];

        // Verify JWT token
        jwt.verify(token, "your_jwt_secret_here", (err, user) => {
            if (!err) {
                req.user = user;
                next(); // Proceed to the next middleware
            } else {
                return res.status(403).json({ message: "User not authenticated" });
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});


// You will provide an endpoint for the registered users to login. This endpoint will do the following:

// Return an error if the username or password is not provided.
// Creates an access token that is valid for 1 hour (60 X 60 seconds) and logs the user in, if the credentials are correct.
// Throws an error, if the credentials are incorrect.

// Login endpoint
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 }); // change expiresIn from 60*60 to 60 to check the validity.

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Register a new user
app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});


const PORT =5000;

app.use("/friends", routes);

app.listen(PORT,()=>console.log("Server is running"));
