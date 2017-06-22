const express = require('express');
const app = express();
const methodOverride = require('method-override')
const port = process.env.PORT || 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('route');
const library = require('./routes/library');
const morgan = require('morgan');

app.set('view engine', 'ejs');
app.disable('x-powered-by');
app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(morgan('short'));
app.use(library);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end();
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app
