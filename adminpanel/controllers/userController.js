const userModel = require('../models/userModel')

const getDashboard = (req,res)=>{
    res.render('index')
}
const getForm = (req,res)=>{
    res.render('form')
}
const getPostData = async (req,res)=>{
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
module.exports = {
    getDashboard,
    getForm,
    getPostData
}