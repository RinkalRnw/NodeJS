const userModel = require('../models/userModel')

const getDashboard = async(req,res) => {
    res.render('index')
    
}
const getAllUserData = async() => {
    console.log("Userdata Dashboard calling")
}
const getUserForm = async(req,res) => {
    res.render('form')    
}

const savePostData = async(req,res) => {
    let checkUser = userModel.findOne({name:req.body.name});
    if(checkUser){
        return res.send("User already exists")
    }
    let empdata = new userModel({
        id:2,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    result = await empdata.save(empdata);
    console.log("User registered successfully"+result)
}

module.exports = {
    getDashboard,getAllUserData,getUserForm,savePostData
}