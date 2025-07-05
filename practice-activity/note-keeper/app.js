// A simple offline Node.js CLI app that adds, deletes, and lists notes.

const fs = require("fs");

const command = process.argv[2];
const input = process.argv[3];

if (!fs.existsSync("notes.json")) {
    fs.writeFileSync("notes.json", "[]");
}

let notes = JSON.parse(fs.readFileSync("notes.json", "utf8"));

// Add commands = add, delete, list

if (command === "add") {
    if (!input) return console.log("Please provide an input to add.");

    // add code here that will not accept the input if already present in the notes.json

    notes.push(input);
    fs.writeFileSync("notes.json", JSON.stringify(notes));

    console.log(`Added note: "${input}"`);

} else if (command === "delete") {
    const filteredNotes = notes.filter((note) => note !== input);
    fs.writeFileSync("notes.json", JSON.stringify(filteredNotes));

    console.log(`Deleted note: ${input}`);

} else if (command === "list") {
    console.log("Your notes: ");

    notes.forEach((note, index) => {
    console.log(`${index + 1}: ${note}`);
    });
}
