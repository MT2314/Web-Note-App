// Dependencies
const uniqueid = require('uniqid');
const express = require('express');
const path = require('path');
const fs = require('fs');


// Sets up the Express App
const app = express();
const PORT = 3000;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to Pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// Get all Notes Route
app.get('/api/notes', (req,res) => {
    let notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    res.json(notes);
    console.log(notes);
});

//Post new Note route
app.post('/api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    let newNote = req.body;
    newNote["id"] = uniqueid();
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
    console.log(notes);
});

//Delete Note

app.delete('/api/notes/:id', (req, res) => {

    let notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    let id = req.params.id;
    notes = notes.filter(note => note.id!==id);
    console.log(notes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);

});

// Listen to Specified Port
app.listen(process.env.PORT || PORT, () => console.log(`App listening on PORT ${PORT}`));
