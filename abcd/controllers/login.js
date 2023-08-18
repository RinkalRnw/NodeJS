const userModel = require('../models/userModel')

const checkLogin = async(req,res) => {
    let checkUser = await userModel.findOne({email:req.body.email, password:req.body.password});
    console.log("User login check...........")
    console.log(checkUser)
    if(checkUser){
        res.cookie('loginemail',checkUser.name)
        res.render('index')
    } else {
        return res.send('Username or password incorrect')
    }
}

module.exports = {
    checkLogin
}