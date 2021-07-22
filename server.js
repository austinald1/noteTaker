const express = require('express');

const fs = require('fs');

const path = require('path');

const { v4: uuidv4 } = require('uuid');
const apiRoutes = require("./routes/apiRoutes")
const htmlRoutes = require("./routes/htmlRoutes")
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
app.use('/api', apiRoutes)
app.use('/', htmlRoutes)




// this should always come last


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});