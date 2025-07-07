const express = require('express');
const router = express.Router();

let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
    res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
    const email = req.params.email;
    const filteredUser = users.filter((user) => user.email === email)
    res.send(filteredUser);
});


// POST request: Create a new user
router.post("/",(req,res)=>{
    users.push({
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "email": req.query.email,
        "DOB": req.query.DOB
    })

    // Message to show if success
    res.send(`The user ${req.query.firstName} has been added!`)
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    const email = req.params.email;
    const filtered_users = users.filter((user) => user.email === email);

    // Select the first matching user and update attributes if provided
    if (filtered_users.length > 0) {
        let filtered_user = filtered_users[0]
        
        // Extract and update DOB if provided
        let DOB = req.query.DOB;
        if (DOB) {
            filtered_user.DOB = DOB;
        }

        // Extract and update firstName if provided
        let firstName = req.query.firstName;
        if (firstName) {
            filtered_user.firstName = firstName;
        }

        // Extract and update lastName if provided
        let lastName = req.query.lastName;
        if (lastName) {
            filtered_user.lastName = lastName;
        }
        
        // Replace old user entry with updated user
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);

        res.send(`User with the email ${email} has been updated.`)
    } else {
        res.send('Cannot find user.')
    }
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    const email = req.params.email;

    // Filter users array to exclude the user with the specified email
    users = users.filter((user) => user.email != email);

    // Send a success message as the response, indicating the user has been deleted
    res.send(`User with the email ${email} has been deleted`)
});

// Practice task

// 1. Create an endpoint in the same code for getting all users with a particular Last Name.
router.get('/lastName/:lastName', (req, res) => {
    const getLastName = req.params.lastName;
    let filteredLastName = users.filter((user) => user.lastName === getLastName);

    res.send(filteredLastName)
});

// 2. Create an endpoint in the same code for sorting users by date of birth.

// Function to convert a date string in the format "dd-mm-yyyy" to a Date object
function getDateFromString(strDate) {
    let [dd, mm, yyyy] = strDate.split('-');
    return new Date(`${yyyy}/${mm}/${dd}`)
}
// Define a route handler for GET requests to the "/sort" endpoint
router.get("/sort", (req, res) => {
    // Sort the users array by DOB in ascending order
    console.log(users)
    let sorted_users = users.sort(function(a, b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
        return d1 - d2;
    });
    // Send the sorted_users array as the response to the client
    res.send(sorted_users);
});

module.exports=router;
