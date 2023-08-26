const express = require('express')
const app = express()

const routes =  require("./routes/user")
const cookie = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash');
const passport = require('passport')
const bodyparser = require('body-parser');
const initializingPassport = require('./controllers/passportConfig')
// const MongoStore = require('connect-mongo')(session);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:'flashblog',
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(cookie())
app.use(session({ secret: "secret-key",resave:true,saveUninitialized:true }));

initializingPassport(passport)

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyparser.urlencoded({ extended: false }));
// app.use(session({ secret: 'testSecret', resave: true, saveUninitialized: true }));
app.use(session({
    secret: 'testSecret',
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }));
app.use(passport.initialize());
app.use(passport.session());

// app.use(express.json())
// app.use(express.urlencoded({ extended:false}))
// app.use(session({
//     secret:'flashblog',
//     saveUninitialized: false,
//     resave: false
// }));
// app.use(passport.initialize())
// app.use(passport.session())


app.set('view engine', 'ejs')
app.use(express.static(__dirname))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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