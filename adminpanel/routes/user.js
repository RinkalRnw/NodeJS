const express = require('express')

const router = express.Router()

const {getDashboard, getForm} = require("../controllers/userController")

// router.route('/admin').get
router.get('/admin/data',getDashboard)
router.get('/admin/form',getForm)

module.exports = router