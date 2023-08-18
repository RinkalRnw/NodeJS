const express = require('express')
const app = express()

const routes =  require("./routes/user")
const cookie = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash');

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