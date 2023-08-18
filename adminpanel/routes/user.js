const express = require('express')
const body = require('body-parser')
const bodyparser = body.urlencoded({extended: false})

const router = express.Router()

const {getDashboard, getForm, getPostData,checkUserData} = require("../controllers/userController")

router.get("/admin/data",getDashboard)
router.get('/admin/form',getForm)
router.post('/admin/savedata',bodyparser,getPostData)

router.post('/checkLogin',bodyparser,checkUserData)

module.exports = router