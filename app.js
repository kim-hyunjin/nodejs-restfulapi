var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./models/book');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var apiRouter = require('./routes/books')(app, Book);
var htmlRouter = require('./routes/main')(app, Book);

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(port, function() {
  console.log("Express server has started on port : " + port);
});

app.use(express.static('public'));

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');
