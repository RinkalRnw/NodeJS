const { request } = require('express');
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const saltRounds = 10;
let plainPassword = '';
<<<<<<< Updated upstream
const cookieParser = require('cookie-parser')
=======
>>>>>>> Stashed changes
const checkUser = async(req,res) => {
    if(req.cookies && req.cookies.UserName != "admin"){
        return res.redirect('/')
    }
}

const getDashboard = async (req,res)=>{
    // await checkUser(req,res)
    res.render('index',{username:"Rinkal"})
}
const getForm = async (req,res)=>{
    // await checkUser(req,res)
    res.render('form',{username:req.cookies.UserName})
}

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'rwa2.rinkal.rk@gmail.com',
            pass: 'qgxeodugpefaqjxq',
         },
    secure: true,
    });
const getPostData = async (req,res)=>{
   const {name,password,email } = req.body
    const checkUser = await userModel.findOne({email})
    console.log("Check User"+checkUser)
    if(checkUser){
        return res.send("Email already in use")
    } else {
        const crypted = await bcrypt.hash(password, saltRounds) 
        const result = new userModel({
            id:1,
            name:name,
            email:email,
            password:crypted
        })
        const mailInfo = {
            from:"rwa2.rinkal.rk@gmail.com",
            to:email,
            subject:"Admin Panel",
            text:"Registration",
            html:"<p>You are successfully registered </p>"
        }
            await transporter.sendMail(mailInfo)
            const res1 = await result.save();
            console.log("Data saved"+res1)
            res.send("Data saved");
        }
        // bcrypt.hash(plainPassword, saltRounds, async(err, hash) => {
        //     if (err) {
        //       // Handle error
        //       console.error("Error hashing password:", err);
        //     } else {
        //       // Store `hash` in the database as the user's password
        //       console.log("Hashed password:", hash);
        //       const result = new userModel({
        //         id:1,
        //         name:req.body.username,
        //         email:req.body.email,
        //         password:hash
        //     })
        //         const res1 = await result.save();
        //         console.log("Data saved"+res1)
        //         res.send("Data saved");
        //     }
        //   });
        
    
    
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
const checkLoginData = async (req,res)=>{
    let userdata = await userModel.findOne({ email: req.body.email });
    if(!userdata){
        res.send("User not found")
    } else {
        const isPasswordValid = await bcrypt.compare(req.body.password, userdata.password);
<<<<<<< Updated upstream
        req.cookie('userId',userdata.id)
=======

>>>>>>> Stashed changes
        if (!isPasswordValid) {
          res.send("Invalid Password")
        }
    }
    res.redirect('/admin/data')
}
<<<<<<< Updated upstream
function generateOTP(){
    var minm = 100000;
    var maxm = 999999;
    otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm
    return otp;

}
const getOTP = async (req,res)=>{
    email=req.body.email
    let userdata = await userModel.findOne({ email: req.body.email });
    if(!userdata){
        res.send("User not found")
    } else {
        otp = generateOTP();
        console.log(otp)
        const transporter = nodemailer.createTransport({
            port: 465,               // true for 465, false for other ports
            host: "smtp.gmail.com",
               auth: {
                    user: 'rwa2.rinkal.rk@gmail.com',
                    pass: 'qgxeodugpefaqjxq',
                 },
            secure: true,
            });
            const mailInfo = {
                from:"rwa2.rinkal.rk@gmail.com",
                to:email,
                subject:"Admin Panel",
                text:"Forget Password",
                html:`<p>Your OTP is ${otp} </p>`
            }
                await transporter.sendMail(mailInfo)
        //Opt generate
        //send mail
        //db otp store
    }
    res.redirect('/admin/data')
}

=======
>>>>>>> Stashed changes
module.exports = {
    getDashboard,
    getForm,
    getPostData,
    checkUserData,
<<<<<<< Updated upstream
    checkLoginData,
    getOTP
=======
    checkLoginData
>>>>>>> Stashed changes
}