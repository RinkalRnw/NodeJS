const userModel = require('../models/userModel')
<<<<<<< Updated upstream
const jwt = require('jsonwebtoken')
const secretKey = "myfirstsecretkey"
const checkLogin = async(req,res) => {

    let checkUser = await userModel.findOne({email:req.body.email, password:req.body.password});
    console.log("User login check...........")
    console.log(checkUser)
    if(checkUser){
        jwt.sign({checkUser},secretKey,{expiresIn:'300s'},(err,token)=>{
            res.json({token})
        })
        // res.cookie('loginemail',checkUser.name)
        // res.render('index')
=======
const bcrypt = require('bcrypt')

const checkLogin = async(req,res) => {
    const {email, password} = req.body
    let userdata = await userModel.findOne({ email });
    if(!userdata){
        res.send("User not found")
>>>>>>> Stashed changes
    } else {
        const isPasswordValid = await bcrypt.compare(password, userdata.password);
        if (!isPasswordValid) {
          res.send("Invalid Password")
        } else {
            res.cookie('loginemail',checkUser.name)
            res.redirect('/admin/')
        }
    }
    // let checkUser = await userModel.findOne({email:req.body.email, password:req.body.password});
    // console.log("User login check...........")
    // console.log(checkUser)
    // if(checkUser){
    //     res.cookie('loginemail',checkUser.name)
    //     res.render('index')
    // } else {
    //     return res.send('Username or password incorrect')
    // }
}

const checkRegister = async(req,res) => {
    const {name,email,password} = req.body
    let checkUser = await userModel.findOne({email});
    if(checkUser){
        res.redirect('/')
        // res.send('UserEmail already registered')
    } else {
        const crypted = await bcrypt.hash(password, 10) 
        let empdata = new userModel({
            id:checkUser.length+1,
            name:name,
            email:email,
            password:crypted
        })
    
        result = await empdata.save(empdata);
        console.log("User registered successfully"+result)
        res.redirect('/admin/')
    }
}
function verifyToken(req,res,next){
    
}
module.exports = {
    checkLogin,checkRegister
}