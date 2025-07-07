// Authentication and Authorization in Node.js

const express = require('express');
const app = express();

// Authentication methods:

// 1. Session-based

// const session = require('express-session');
// app.use(express.json()) // Middleware to parse JSON request bodies

// // Middleware to set up session management
// app.use(session({
//     secret: 'secret-key-toytoy', // Replace with a strong secret key
//     resave: false, // Whether to save the session data if there were no modifications
//     saveUninitialized: true, // Whether to save new but not modified
//     cookie: {secure: false} // Set to true in production with HTTPS
// }));

// // POST endpoint for handling login
// app.post('/login', (req, res) => {
//     const {username, password} = req.body;
//     // Simulated user authentication (replace with actual logic)
//     if (username === 'user' && password === 'pwd123') {
//         req.session.user = username; // Store user information in session
//         console.log('Logged in successfully');
//         res.send('Logged in successfully');
//     } else {
//         res.send ("Invalid credentials");
//     }
// });

// // GET endpoint for accessing dashboard
// app.get('/dashboard', (req, res) => {
//     if (req.session.user) {
//         res.send(`Welcome ${req.session.user}`) // Display welcome message with user's name
//     } else {
//         res.status(401).send("Unauthorized!")
//     }
// })

// app.listen(3000, () => {
//     console.log(`Listening at http://localhost:3000`)
// })


// 2. Token-based authentication

// Setup
// const express = require('express');
// const app = express();
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(express.json())

// const secretKey = 'your-secret-key' // Replace with a strong secret key

// // POST endpoint for user login and JWT generation (/login)
// app.post('/login', (req, res) => {
//     const {username, password} = req.body;
//     // Simulated user authentication;
//     if (username === 'user' && password === 'password') {
//         // Generate JWT with username payload
//         const token = jwt.sign({username}, secretKey, {expiresIn: '1h'});
//         res.json({ token }) // Send token as JSON response
//     } else {
//         res.status(401).send("Invalid credentials");
//     }
// });

// // GET endpoint to access protected resource (dashboard)
// app.get('/dashboard', (req, res) => {
//     const authHeader = req.headers['authorization'];

//     if (!authHeader) {
//         return res.status(401).send("Token required!");
//     }

//     const token = authHeader.split(' ')[1]; // extract token

//     if (token) {
//         jwt.verify(token, secretKey, (err, decoded) => {
//             if (err) {
//                 res.status(401).send("Invalid token!");
//             } else {
//                 res.send(`Welcome ${decoded.username}`); // send response on success
//             }
//         });
//     } else {
//         res.status(401).send("Token format error!"); //handle malformed header
//     }
// });

// app.listen(3000, () => {
//     console.log(`Listening at http://localhost:3000`)
// })


// 3. Passwordless-based authentication

// const express = require('express');
// const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// app.use(bodyParser.json());
app.use(express.json());

const users = {}; // In-memory storage for demo purposes

// Endpoint to request access and send verification code via email
app.post('/request-access', (req, res) => {
    const { email } = req.body

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the code in-memory (users object)
    users[email] = code;

    // Simulated email sending (for demonstration)
    console.log(`Sending code ${code} to ${email}`);
    res.status(200).send('Code sent to your email');
});

// Endpoint to verify the received code
app.post('/verify-code', (req, res) => {
    const {email, code} = req.body;

    // Compare the received code with stored code for the email
    if (users[email] && users[email] === code) {
        // Code matches, access granted
        res.send('Access granted');
    } else {
        res.send('Access Denied')
    }
});

app.listen(3000, () => {
    console.log(`Listening at http://localhost:3000`)
})