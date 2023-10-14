const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const body = bodyParser.urlencoded({ extended: true })

app.use(express.static(__dirname));
const passport = require('passport');
const cookieSession = require('cookie-session'); 
require("../models/googleauthconfig")
const rolemodel = require('../models/roleModel');
// const app = express();
// const bodyParser = require('body-parser');
// app.use(express.json());
// app.use(bodyParser.json());

const routes = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

const verifyToken = require('../models/jwtconfig');
const {main,form,formdata,login,signup,checklogin,logout,forgetpass,otp,resetpass,savepass} = require('../controllers/user');
const {categoryData,savecat,deleteCatData,editCatData,updatecat} = require('../controllers/category');
const {savesubcat,allSubCat,deleteSubCat,editSubCat,updatesubcat,getCatData,getFilterData} = require('../controllers/subcategory');

const {products,getSubData,saveproduct} = require('../controllers/products')
const {roleData,saverole,checkRole,deleteRoleData,editRoleData,updaterole} = require('../controllers/role');

const {loginDetails,savedata} = require('../controllers/googleController')
/* Role Routes */

    routes.get('/role',checkRole,roleData);
    routes.post('/saverole',body,saverole)
    routes.get('/deleteRole/:id',checkRole,deleteRoleData);
    routes.get('/editRole/:id',checkRole,editRoleData);
    routes.post('/updateRole/:id',body,updaterole)

routes.get('/admin',login);

//Google routes
routes.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));
 
routes.get('/auth/google/callback', 
  passport.authenticate('google', { 
        // successRedirect:'/admin/home',
        failureRedirect: '/admin'
   }),async (req,res)=>{
    let roleData1 = await rolemodel.find({isActive:1})
      console.log(req.user.profile)
      if(req.user.created){
          res.render('logindetails',{
            user:req.user.profile,
            roleData:roleData1,
            message2:"You have been registered successfully."
          });
      } else {
          res.redirect('/admin/home');
      }
   });

routes.get('/admin/home',main);
routes.get('/admin/form',formdata);
routes.get('/admin/category',checkRole,categoryData);
routes.post('/admin/savecategory',body,savecat)
routes.post('/admin/savesubcategory',body,savesubcat)
routes.post('/admin/saveproduct',body,saveproduct)

routes.get('/admin/allSubCategory',allSubCat);
routes.get('/admin/products',products);
routes.get('/admin/deleteSubCat/:id',deleteSubCat);
routes.get('/admin/editSubCat/:id',editSubCat);
routes.post('/admin/updatesubcategory/:id',body,updatesubcat)


routes.get('/admin/details',loginDetails);
routes.post('/admin/details',body,savedata);



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
routes.get('/getData',getCatData);
routes.get('/getfilterData',getFilterData);
routes.get('/getSubData',getSubData);

module.exports = routes;