const express = require('express')
const app = express()
const { connectDB,User } = require('./db')

connectDB()
app.get('/', (req, res) => {
    res.send("Hello world")
})

app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render('index')
})
app.get("/register",(req,res)=>{
    res.render('register')
})
app.post('/register',async (req,res)=>{
    const user = await User.findOne({username:req.body.username})
    if(user) {
        return res.send("User already registered");
    }
    const newUser = await User.create(req.body);
    res.send(newUser);
})

app.listen(3000,()=>{
    console.log('listening on port 3000');
})