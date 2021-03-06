var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors')

mongoose.connect('mongodb://localhost:27017/phonebook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var phonebooksRouter = require('./routes/phoneBooks');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/phonebooks', phonebooksRouter);

module.exports = app;
