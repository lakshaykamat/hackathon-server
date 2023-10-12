require('dotenv').config();
require('./config/passport.js');
const express = require('express');
const connectDb = require('./config/db');
// const cors = require('cors');
const passport = require('passport');
// const cookieSession = require('cookie-session');
const expressSession = require('express-session');
const { getAvatar } = require('./util/getAvatar.js');
// const isAuthenticated = require('./middleware/isAuthenticated.js');
// const errorHandler = require('./middleware/errorHandler.js');
// const ROUTES = require('./constants/ROUTES.js');
// const Admin = require('./models/Admin.js');
const User = require('./models/User.js')
// const bcrypt = require('bcrypt')
// // Connecting to Database
 connectDb();

const app = express();


app.use(express.json());


app.use(expressSession({
    secret: 'our-secret', resave: false, saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

app.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ email });
   
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }


    const newUser = await User.create({
      username,password,email,avatar:getAvatar(email)
  })

    res.json({user:newUser})
    res.redirect('/login');
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/login', (req, res) => {
  // If user is already authenticated, redirect to the dashboard
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.render('login');
  }
});

app.get('/dashboard', (req, res) => {
  // Ensure the user is authenticated before accessing the dashboard
  if (req.isAuthenticated()) {
    res.send('Dashboard Page');
  } else {
    res.redirect('/login');
  }
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Temp', message: 'Hello, World' });
});

app.get('/register', (req, res) => {
  res.render('register');
});


app.use(`/api/v1/hello`,(req,res)=>res.send("Hello World"));


// Global error handler
// app.use(errorHandler);

// Start the server
app.listen(8000 || process.env.PORT, () => console.log(`Server listening on port 8000!`));