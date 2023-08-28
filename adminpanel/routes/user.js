const express = require('express')
const body = require('body-parser')
const bodyparser = body.urlencoded({extended: false})
const passport = require("passport");
const router = express.Router()

<<<<<<< Updated upstream
const {getDashboard, getForm, getPostData,checkUserData,checkLoginData,getOTP} = require("../controllers/userController")

router.get('/forgotpassword',(req,res)=>{
  res.render('forgetform')
})
router.post('/otp',bodyparser,getOTP)
=======
const {getDashboard, getForm, getPostData,checkUserData,checkLoginData} = require("../controllers/userController")
>>>>>>> Stashed changes

router.get("/admin/data",getDashboard)
router.get('/admin/form',getForm)
router.post('/admin/savedata',bodyparser,getPostData)

router.post(
    "/admin/login",bodyparser,checkLoginData
  );
  
// router.post('/checkLogin',bodyparser,checkUserData)

module.exports = router