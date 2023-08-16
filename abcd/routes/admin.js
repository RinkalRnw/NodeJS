const express = require('express');

const router = express.Router();
const {getDashboard,getAllUserData} = require("../controllers/user")
router.get('/', getDashboard);
router.route('/user').get(getAllUserData)

module.exports = router;