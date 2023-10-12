require('dotenv').config();
require('./config/passport.js');
const express = require('express');
const connectDb = require('./config/db');
// const cors = require('cors');
const passport = require('passport');
// const cookieSession = require('cookie-session');
const expressSession = require('express-session');
// const isAuthenticated = require('./middleware/isAuthenticated.js');
// const errorHandler = require('./middleware/errorHandler.js');
// const ROUTES = require('./constants/ROUTES.js');
// const Admin = require('./models/Admin.js');
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

app.post('/register', (req, res) => {
  // Extract the user input from the request
  const { username, password } = req.body;

  // Check if the username is already taken
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (user) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Create a new user with the provided username and password
    const newUser = new User({ username, password });

    // Save the new user to the database
    newUser.save((err) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      // Redirect to the login page or any other appropriate page
      res.redirect('/login');
    });
  });
});



// // Set up view engine

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Temp', message: 'Hello, World' });
});



 app.use(`/api/v1/hello`,(req,res)=>res.send("Hello World"));


// Global error handler
// app.use(errorHandler);

// Start the server
app.listen(8000 || process.env.PORT, () => console.log(`Server listening on port 8000!`));