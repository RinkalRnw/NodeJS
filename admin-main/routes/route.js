const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const body = bodyParser.urlencoded({ extended: true })

const routes = express.Router();

const {main,form,formdata,login,signup,checklogin,logout,forgetpass,otp,resetpass,savepass} = require('../controllers/user');
const {categoryData,savecat,deleteCatData,editCatData,updatecat} = require('../controllers/category');
const savesubcat = require('../controllers/subcategory');

routes.get('/admin',login);
routes.get('/admin/home',main);
routes.get('/admin/form',formdata);
routes.get('/admin/category',categoryData);
routes.post('/admin/savecategory',body,savecat)
routes.post('/admin/savesubcategory',body,savesubcat)

routes.post('/admin/updatecategory/:id',body,updatecat)
routes.get('/admin/deletecat/:id',deleteCatData);
routes.get('/admin/editcat/:id',editCatData);

routes.get('/admin/forgetpass',forgetpass);
routes.post('/admin/data',body,form);
routes.get('/admin/signup',signup);
routes.get('/admin/logout',logout);
routes.post('/admin/checklogin',body,checklogin);
routes.post('/admin/otp',body,otp);
routes.post('/admin/reset',body,resetpass);
routes.post('/admin/savepass',body,savepass);

module.exports = routes;