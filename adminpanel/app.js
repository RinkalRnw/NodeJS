const express = require('express')
const app = express()

const routes =  require("./routes/user")
const cookie = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash');
const userModel = require('./models/userModel')


const passport = require('passport')
var LocalStratgy = require('passport-local').Strategy;

app.post('/login', passport.authenticate('local'),
    function(req, res) {
        res.redirect('/home');
});

/* Login logic for passport.authenticate*/
passport.use(new LocalStratgy(
    function(username, password, done) {
        userModel.find({ name: "admin" }, function (err, user) {
            if(user !== null) {
                return done(null,user)
           } else {
               console.log("Username does not exist!");
               return done(null, false);
           }
       });
    }
));

/**********
Serialize and Deserialize here for passport.authenticate
**********/
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(err, user);
});


app.use(cookie())

app.set('view engine', 'ejs')
app.use(express.static(__dirname))

app.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));
  

app.use(flash());
  
app.use(routes)

app.get('/', (req, res) => {
    res.render('login',{ message: '' })
})


  

app.get('/logout', (req, res) => {
    res.clearCookie('UserName')
    res.redirect('/')

})
app.get('/register', (req, res) => {
    res.render('register')
})
app.listen(8001, () => {
    console.log("listening on port 8001")
})