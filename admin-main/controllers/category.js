const express = require('express');
const model = require('../models/categoryModel');

const app = express();
// const bodyParser = require('body-parser');
app.use(express.json());

const categoryData =async (req,res)=>{
   const dt = new model({});
     const getAllCat = await dt.find({});
    console.log(getAllCat);
    
    res.render('category',{
                    username: req.cookies.UserName,
                    getAllCat: getAllCat
                        });
} 
const savecat = async (req,res)=>{
    const id = 1;
    const catname = req.body.catname;
    const checkName = await model.findOne({catname:catname})
    if(checkName){
        res.send("Category Already Exists!");
    }
    const result = {
        id: id,
        catname: catname
    }
    const savedata = new model(result);
    await savedata.save();
    const getAllCat = await model.find();
    req.flash('success', 'Category added successfully');
    res.render('category',{username: req.cookies.UserName,getAllCat: getAllCat});

}

module.exports = {categoryData,savecat};