// Importing Libs
const express = require('express');
const path = require('path');

// Init express
const app = express();

// Initial constants
const PORT = process.env.PORT || 8080;

app.get('/*', (req, res) => {
  const page = path.join(__dirname, '../public/index.pug');
  res.sendFile(page);
});

// Listening for clients
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
