const express = require('express')
const app = express()

const routes =  require("./routes/user")
const cookie = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash');
const userModel = require('./models/userModel')
const initializingPassport = require('./controllers/passportConfig')

const passport = require('passport')

initializingPassport(passport)

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

app.set('view engine', 'ejs')
app.use(express.static(__dirname))


  

app.use(flash());
  
app.use(routes)

app.get('/', (req, res) => {
    res.render('login',{ message: '' })
})

app.post('/login',passport.authenticate("local",{ failureRedirect:"/",successRedirect:"/admin/data"}),async (req,res)=>{

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