const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const cookie = require('cookie-parser');
const dbConnect = require('./models/dbconfig')

const passport = require('passport');
// const cookieSession = require('cookie-session'); 
dbConnect();
app.use(cookie());
// app.use(cookieSession({ 
//     name: 'google-auth-session', 
//     keys: ['key1', 'key2'] 
// })); 
app.use(session({
    secret: 'flashblog',
    saveUninitialized: true,
    resave: true

}))
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(flash());

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

const routes = require('./routes/route');
app.use(routes);

app.listen(5000, () => {
    console.log('listening on port 5000');
})




