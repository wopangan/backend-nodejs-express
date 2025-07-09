const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};

// GET request: Retrieve all friends
router.get("/",(req,res)=>{

  // Exercise 2: Get all the user information using JSON string
  res.send(JSON.stringify(friends, null, 4));
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{

  // Exercise 3: View the user based on email BUT without using filter method.
  const email = req.params.email;
  res.send(friends[email]);
});


// POST request: Add a new friend
router.post("/", (req,res)=>{
  
  // Exercise 4: add the new user to the JSON/dictionary.
  // check if email is provided in the request body
  if (req.body.email) {
    // Create or update friend's details based on provided email
    friends[req.body.email] = {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "DOB": req.body.DOB
    };
  }
  // response indicating user addition
  res.send("The user" + (' ') + (req.body.firstName) + " has been added!");
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {

  // Exercise 5: PUT method to modify the friend details
  const email = req.params.email;
  let friend = friends[email]; // Retrieve friend object associated with email

  // Check if friend exists
  if (friend) {
    let DOB = req.body.DOB;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    // Update DOB, firstName, and lastName if provided in the request body
    if (DOB) {
      friend["DOB"] = DOB;
    }
    if (firstName) {
      friend["firstName"] = firstName;
    }
    if (lastName) {
      friend["lastName"] = lastName;
    }

    friends[email] = friend // update friend details in 'friends' object
    res.send(`Friend with the email ${email} has been updated.`);
  } else {
    res.send("Unable to find friend!");

  }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {

  // Exercise 6: delete friend information based on the email
  const email = req.params.email;

  if (email) {
    delete friends[email];
  }

  res.send(`Friend with the email ${email} has been successfully deleted.`)
});

module.exports=router;
