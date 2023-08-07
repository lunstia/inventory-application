const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const shopRouter = require('./routes/shop');

const mongoURL = "mongodb+srv://lunstia:iHN3Ujp4jXV5LrM6@cluster0.duwmlsq.mongodb.net/inventory?retryWrites=true&w=majority"

async function main() {
  await mongoose.connect(mongoURL);
}

main().catch(err => console.log(err));



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/shop', shopRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {status: err.status};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
