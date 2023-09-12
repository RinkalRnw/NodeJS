const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const body = bodyParser.urlencoded({ extended: true })

const routes = express.Router();

const {main,form,formdata,login,signup,checklogin,logout,forgetpass,otp,resetpass,savepass} = require('../controllers/user');
const {categoryData,savecat} = require('../controllers/category');


routes.get('/admin',login);
routes.get('/admin/home',main);
routes.get('/admin/form',formdata);
routes.get('/admin/category',categoryData);
routes.post('/admin/savecategory',body,savecat)

routes.get('/admin/forgetpass',forgetpass);
routes.post('/admin/data',body,form);
routes.get('/admin/signup',signup);
routes.get('/admin/logout',logout);
routes.post('/admin/checklogin',body,checklogin);
routes.post('/admin/otp',body,otp);
routes.post('/admin/reset',body,resetpass);
routes.post('/admin/savepass',body,savepass);

module.exports = routes;