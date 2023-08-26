const userModel = require('../models/userModel')
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
    } else {
        return res.send('Username or password incorrect')
    }
}
function verifyToken(req,res,next){
    
}
module.exports = {
    checkLogin
}