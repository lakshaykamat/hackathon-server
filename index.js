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
//Connecting to Database
 connectDb();

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true }))

app.use(expressSession({
    secret: 'our-secret', resave: false, saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
  } else {
    res.render('login');
  }
});

app.get('/dashboard', (req, res) => {
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

app.get('/500', (req, res) => {
  res.render('500', { title: '500 Internal', message: 'Internal Server Error :(' });
});

app.get('/register', (req, res) => {
  res.render('register');
});


app.use(`/api/v1/hello`,(req,res)=>res.send("Hello World"));
app.use('/api/v1/user',require('./routes/user.js'))


// Global error handler
// app.use(errorHandler);

// Start the server
app.listen(8000 || process.env.PORT, () => console.log(`Server listening on port 8000!`));