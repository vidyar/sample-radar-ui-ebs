var http = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.resolve('./public/views/home.html')); 
});


var PORT = process.env.WWW_PORT || '3000';

// listen
app.listen(PORT, function() {
  console.log("Application running on port:", PORT);
});