const userModel = require('../models/userModel')
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'prof.rnwrinkala2@gmail.com',
            pass: 'ramudijfgsimlgyv',
         },
    secure: true,
    });

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
    // let checkUser = userModel.findOne({name:req.body.name});
    // if(checkUser){
    //     return res.send("User already exists")
    // }

    const mailData = {
        from: 'prof.rnwrinkala2@gmail.com',  // sender address
          to: req.body.email,   // list of receivers
          subject: 'Sending Email using Node.js',
          text: 'That was easy!',
          html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
        };
    let empdata = new userModel({
        id:2,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    await transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
    result = await empdata.save(empdata);
    console.log("User registered successfully"+result)
}

module.exports = {
    getDashboard,getAllUserData,getUserForm,savePostData
}