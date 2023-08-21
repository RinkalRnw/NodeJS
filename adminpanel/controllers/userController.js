const userModel = require('../models/userModel')
const checkUser = async(req,res) => {
    if(req.cookies && req.cookies.UserName != "admin"){
        return res.redirect('/')
    }
}

const getDashboard = async (req,res)=>{
    await checkUser(req,res)
    res.render('index',{username:req.cookies.UserName})
}
const getForm = async (req,res)=>{
    await checkUser(req,res)
    res.render('form',{username:req.cookies.UserName})
}
const getPostData = async (req,res)=>{
    const checkUser = await userModel.findOne({email: req.body.email})
    console.log("Check User"+checkUser)
    if(checkUser){
        return res.send("Email already in use")
    } else {
        const result = new userModel({
            id:1,
            name:req.body.username,
            email:req.body.email,
            password:req.body.password
        })
        const res1 = await result.save();
        console.log("Data saved"+res1)
        res.send("Data saved");
    }
    
}

const checkUserData = async (req,res)=>{ 
    const checkUser = await userModel.findOne({email: req.body.email,password:req.body.password})
    if(checkUser){
        res.cookie("UserName",checkUser.name)
        res.redirect('/admin/data')
    } else {
        req.flash('danger', 'Email or password wrong!')
        res.render('login', { message: req.flash('danger') });
    }
}
module.exports = {
    getDashboard,
    getForm,
    getPostData,
    checkUserData
}