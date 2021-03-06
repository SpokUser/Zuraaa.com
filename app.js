const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const Mongo = require("./modules/mongo");
const indexRouter = require('./routes/index');
const botsRouter = require('./routes/bots');
const discordRouter = require('./routes/discord');
const oauth = require('./routes/oauth2');
const user = require('./routes/user');
const staff = require("./routes/staff");
const api = require("./routes/api");

const app = express();

const config = require("./config");
const tag = require('./routes/tag');
const db = new Mongo(config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

app.use(session({
  secret: config.server.session.secret,
  resave: true,
  saveUninitialized: false
}));

app.use('/', indexRouter(db));
app.use('/bots', botsRouter(config, db));
app.use('/discord', discordRouter(config));
app.use('/oauth2', oauth(config, db));
app.use('/user', user(db, config));
app.use('/tag', tag(db));
app.use("/staff", staff(config, db));
app.use("/api", api(db));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {
  app,
  config
}
