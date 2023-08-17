const express = require('express')
const body = require('body-parser')
const bodyparser = body.urlencoded({extended: false})

const router = express.Router()

const {getDashboard, getForm, getPostData} = require("../controllers/userController")

// router.route('/admin').get
router.get('/admin/data',getDashboard)
router.get('/admin/form',getForm)
router.post('/admin/savedata',bodyparser,getPostData)

module.exports = router