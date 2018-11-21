const config = {
  seed:true
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var inventoryRouter = require('./routes/inventory.js');
var recipesRouter = require('./routes/recipes.js');

var app = express();

mongoose.connect("mongodb://localhost/bar_app", { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database");
  if(config.seed) {
    const seed = require("./seeding/seedExec");
    seed.exec()
    .catch((err)=>{
      // console.log("caught");
      console.log(err);
    });
  }
});

app.use(logger('dev'));
// app.use(express.json());
app.use(bodyParser.json())
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());


app.use('/api/inventory', inventoryRouter);
app.use('/api/recipes', recipesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
