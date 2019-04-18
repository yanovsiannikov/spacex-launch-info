const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const redis   = require("redis");
const RedisStore = require('connect-redis')(session);
const client  = redis.createClient();
const {cookiesCleaner} = require('./middleware/auth');
const methodOverride = require('method-override')

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use(session({
  store: new RedisStore({ 
    client,
    host: 'localhost', 
    port: 6379, 
  }),
  key: 'user_sid',
  secret: 'anything here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 86400000
  }
}));

app.use(cookiesCleaner);


app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const launchRouter = require("./routes/launch");

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/falcon', { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/launches', launchRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
