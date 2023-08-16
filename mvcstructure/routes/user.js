const express = require('express');

const router = express.Router();
 const {getAllUser,getAllUserData} = require("../controllers/user")

 router.route('/user').get(getAllUser)
 router.route('/user/data').get(getAllUserData)

 module.exports = router
