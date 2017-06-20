const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('route');
const library = require('./routes/library');

app.set('view engine', 'ejs');

app.use(library);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end();
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app
