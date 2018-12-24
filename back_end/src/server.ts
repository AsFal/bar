const config = {
  seed: false
};

const createError = require("http-errors");
const express = require("express");
import { Request, Response } from "express";
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



const ingredientRouter = require("./routes/ingredient");
const ingredientListRouter = require("./routes/ingredient_list");
const recipeRouter = require("./routes/recipe");
const menuRouter = require("./routes/menu");
import { checkJwt } from "./config/auth";

const app = express();

app.use(checkJwt);


mongoose.connect("mongodb://localhost/bar_app", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("connected to database");
  if (config.seed) {
    const seed = require("./seeding/seedExec");
    seed.exec()
    .then(() => {console.log("Database has been seeded"); })
    .catch((err: string) => {
      console.log(err);
    });
  }
});

app.use(logger("dev"));
// app.use(express.json());
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());


app.use("/api/ingredient", ingredientRouter);
app.use("/api/ingredient_list", ingredientListRouter);
app.use("/api/menu", menuRouter);
app.use("/api/recipe", recipeRouter);

// const testSetupRoute = require("../tests/postman_envs/setup_route");
// app.use("/api", testSetupRoute);


// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: Function) {
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
