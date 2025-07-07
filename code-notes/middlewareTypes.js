const express = require('express');
const app = express();

// 1. Application-level middleware

// Bound with app.use();
// Useful for authentication and checking session information
app.use(function(req, res, next) {
    if (req.query.password !== "pwd123") {
        return res.status(402).send("This user cannot login.")
    }
    console.log('Time', Date.now());
    next()
});

app.get('/', (req, res) => {
    return res.send("Hello, World!");
});

app.listen(3000, () => {
    console.log(`Listening at http://localhost:3000`)
})
// check here -> http://localhost:3000/?password=pwd123


// 2. Router-level middleware

// Bound wtih router.use();
let userRouter = express.Router()
let itemRouter = express.Router()

// // define userRouter
userRouter.use(function(req, res, next) {
    console.log("User query Time: ", Date());
    next();
})

// // define the middleware function that the userRouter will use and what happens next
userRouter.get('/:id', function(req, res, next) {
    res.send("User " + req.params.id + " last successful login " + Date())
})

// // define itemRouter
itemRouter.use(function(req, res, next) {
    console.log("Item query Time: ", Date());
    next();
})

// // define the middleware function that the itemRouter will use and what happens next
itemRouter.get('/:id', function(req, res, next) {
    res.send("Item " + req.params.id + " last enquiry " + Date())
})

// // then bind application routes to each router
app.use('/user', userRouter);
app.use('/item', itemRouter);

app.listen(3000, () => {
    console.log(`Listening at http://localhost:3000`)
})


// 3. Error-handling middleware

// Bound with app.use or router.use()
// takes 4 arguments = error, request, response, and next function that needs to be chained to

// application-level error handling middleware
app.use("/user/:id", function(req, res, next) { 
    if (req.params.id == 1) {
        throw new Error("Trying to access admin login");
    } else {
        next();
    }
})

// // for error handled by the middleware with 500 status code
app.use(function (err, req, res, next) {
    if (err != null) {
        res.status(500).send(err.toString())
    } else {
        next();
    }
})

app.get("/user/:id", (req, res) => {
    return res.send(`Hello! User Id ${req.params.id}`)
})

app.listen(3000, () => {
    console.log(`Listening at http://localhost:3000`)
})


// 4. Built-in middleware

// Bound to entire applications or specific routers.
// Useful for activities such as rendering HTML or static files, JSON, and parsing cookies
app.use(express.static('filename'))

app.listen(3000, () => {
    console.log(`Listening at http://localhost:3000`)
})


// 5. Third-party middleware
// Open source, third party, user defined

// user defined middleware
function myLogger(req, res, next) {
    req.timeReceived = Date();
    next();
}

// making the application use it
app.use(myLogger)

app.get("/", (req, res) => {
    res.send(`Request received at ${req.timeReceived} is a success!`)
})

app.listen(3000, () => {
    console.log(`Listening at http://localhost:3000`)
})