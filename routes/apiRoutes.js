function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      console.log('bad title format');
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      console.log('bad text format');
      return false;
    }
    return true;
  }
  
  // add a note to json file and notes array in this function
  function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, './data/notes.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
  }
  
  function deleteNote(id, notesArray) {
    notesArray = notesArray.filter((note) => note.id !== id);
    fs.writeFileSync(
      path.join(__dirname, './data/notes.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
  }
  const router = require('express').Router();
  const fs = require('fs')
  const path = require('path')
  const {v4: uuidv4} = require('uuid')
  let notes = require('../data/notes')
  router.get('/notes', (req, res) => {
    console.log(notes);
    let results = notes;
    res.json(results);
  });
  
  router.post('/notes', (req, res) => {
    // this only works if no data is removed, otherwise id's will be thrown off
    req.body.id = uuidv4();
    if (!validateNote(req.body)) {
      res.status(400).send('The note is not properly formatted');
    } else {
      const note = createNewNote(req.body, notes);
      res.json(req.body);
    }
  });
  
  router.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    const deleted = notes.find((note) => note.id === id);
    if (deleted) {
      notes = notes.filter((note) => note.id !== id);
      res.json(id);
      fs.writeFileSync(
        path.join(__dirname, './data/notes.json'),
        JSON.stringify({ notes: notes }, null, 2)
      );
    } else {
      res
        .status(404)
        .json({ message: 'note you are looking for does not exist' });
    }
  });
  module.exports = router;
