const express = require('express');
const body = require("body-parser");
const bodyparser = body.urlencoded({extended:false})

const router = express.Router();
const {getDashboard,getAllUserData,getUserForm,savePostData} = require("../controllers/user")
router.get('/', getDashboard);
router.get('/form', getUserForm);
router.post('/usersave',bodyparser,savePostData)
router.route('/user').get(getAllUserData)

module.exports = router;