const express = require('express')
const app = express()

const routes =  require("./routes/user")
const cookie = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash');
const passport = require('passport')
const bodyParser = require('body-parser');
const checkPassportLogin = require('./controllers/passportConfig')

checkPassportLogin(passport)


app.use(cookie())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'testSecret', resave: true, saveUninitialized: true }));
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

  

app.use(flash());
  
app.use(routes)

app.get('/', (req, res) => {
    res.render('login',{ message: '' })
})

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/', failureMessage: true, successRedirect:"/admin/data" }),
  function(req, res) {
    res.redirect('/admin/data')
    // res.redirect('/~' + req.user.name);
  });
  

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