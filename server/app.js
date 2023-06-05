const express = require('express');
const app = express();
const path = require('path');

// You'll of course want static middleware so your browser can request things like your 'bundle.js'
app.use(express.static(path.join(__dirname, '..', 'public')));

// Any routes or other various middlewares should go here!

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that would go before this as well)
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;