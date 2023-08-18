const express = require('express');
const app = express();
const cookie = require('cookie-parser');
app.use(cookie());
const body = require("body-parser");
const bodyparser = body.urlencoded({extended:false})


const router = express.Router();
const {checkLogin} = require("../controllers/login")
router.post('/checkLogin',bodyparser,checkLogin)


module.exports = router;