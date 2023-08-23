const express = require('express')
const body = require('body-parser')
const bodyparser = body.urlencoded({extended: false})
const passport = require("passport");
const router = express.Router()

const {getDashboard, getForm, getPostData,checkUserData} = require("../controllers/userController")

router.get("/admin/data",getDashboard)
router.get('/admin/form',getForm)
router.post('/admin/savedata',bodyparser,getPostData)

router.post(
    "/admin/login",
    passport.authenticate("local", {
      successRedirect: "/admin/data",
      failureRedirect: "/",
    }),
    async (req, res) => {
      res.send("done");
    }
  );
// router.post('/checkLogin',bodyparser,checkUserData)

module.exports = router