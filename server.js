const express = require('express');

const fs = require('fs');

const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// middleware --> a helper functioin that works in between the response and request cycle
// built in express middleware called static

// parse incoming string or array data

app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data

app.use(express.json());

// express isn't designed to host static files
// helps create virtual path between location of the file based on the directory given and the route itself
app.use(express.static('public'));

const { animals } = require('./data/animals');
const { notes } = require('./data/notes');

app.get('/api/notes', (req, res) => {
  console.log(notes);
  let results = notes;
  res.json(results);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// this should always come last
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});