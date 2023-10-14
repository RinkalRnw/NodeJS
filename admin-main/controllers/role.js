const express = require('express');
const rolemodel = require('../models/roleModel');   


const app = express();
// const bodyParser = require('body-parser');
app.use(express.json());
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
let editrole=  '';
const roleData =async (req,res)=>{
    const getAllRole = await rolemodel.find();
    res.render('role',{
                    username: req.cookies.UserName,
                    getAllRole: getAllRole,
                    message2:'',
                    editrole:editrole
            });
} 
const saverole = async (req,res)=>{
    let getAllRole = await rolemodel.find();
    let len = getAllRole.length+1;
    const rolename = req.body.rolename;
    const checkName = await rolemodel.findOne({rolename:rolename})
    
    if(checkName){       
            req.flash('success', 'role already exists');
            res.render('role',{
                username: req.cookies.UserName,
                getAllRole: getAllRole,
                message2: req.flash('success'),
                editrole:''
            });
    } else {
        const result = {
            rolename: rolename,
            isActive:1
        }
        const savedata = new rolemodel(result);
        await savedata.save();
        getAllRole = await rolemodel.find();
        req.flash('success', 'role added successfully');
        res.render('role',{
            username: req.cookies.UserName,
            getAllRole: getAllRole,
            message2: req.flash('success'),
            editrole:''
        }); 
    }
}

const deleteRoleData = async (req,res)=>{
    const id = req.params.id;
    const data = await rolemodel.findByIdAndRemove({_id: id});
        if(data){
            res.redirect('/role')
        }
}

const editRoleData = async (req,res)=>{
    const id = req.params.id;
    getAllRole = await rolemodel.find();
    editrole = await rolemodel.findOne({_id: id});
    if(editrole){
        res.render('role',{
            username: req.cookies.UserName,
            getAllRole: getAllRole,
            message2: '',
            editrole:editrole
        }); 
    }

}
const updaterole = async (req,res)=>{
    const id = req.params.id
    const rolename = req.body.rolename;
    const result = await rolemodel.findByIdAndUpdate({
            _id:id
    },
        {$set:{
            rolename:rolename
        }
    }
    )
    getAllRole = await rolemodel.find();
    req.flash('success', 'role updated successfully');
    if(result){
        res.render('role',{
            username: req.cookies.UserName,
            getAllRole: getAllRole,
            message2: req.flash('success'),
            editrole:''
        }); 
    }

}

const checkRole = async (req, res,next)=>{
    let role = JSON.parse(localStorage.getItem('userRole'));
    console.log(role);
    if(role=="Admin"){
        next();
    } else {
        res.render('pagenotfound')
    }
}
module.exports = {roleData,saverole,deleteRoleData,editRoleData,checkRole,updaterole};