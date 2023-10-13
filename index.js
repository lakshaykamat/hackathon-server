require('dotenv').config();
require('./config/passport.js');
const express = require('express');
const connectDb = require('./config/db');
const passport = require('passport');
const expressSession = require('express-session');
 connectDb();

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true }))


app.use(expressSession({
  secret:'our-secret',
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Remember to set true on https
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});


app.set('view engine', 'ejs');

app.get('/',isAuthenticated,(req, res) => {
  const user = req.user
    res.render('index', { email: user.email, username: user.username,avatar:user.avatar });

});

app.get('/500', (req, res) => {
  res.render('500', { title: '500 Internal', message: 'Internal Server Error :(' });
});

app.get('/register', (req, res) => {
  res.render('register');
});


app.use(`/api/v1/hello`,(req,res)=>res.send("Hello World"));
app.use('/api/v1/user',require('./routes/user.js'))

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}
// Global error handler
// app.use(errorHandler);

// Start the server
app.listen(8000 || process.env.PORT, () => console.log(`Server listening on port 8000!`));