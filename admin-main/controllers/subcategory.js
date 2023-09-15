const express = require('express');
const submodel = require('../models/categoryModel');

const app = express();
// const bodyParser = require('body-parser');
app.use(express.json());
let editcat=  '';
const categoryData =async (req,res)=>{
    const getAllCat = await model.find();
    console.log(getAllCat);

    res.render('category',{
                    username: req.cookies.UserName,
                    getAllCat: getAllCat,
                    message2:'',
                    editcat:''
            });
} 
const savesubcat = async (req,res)=>{
    let getAllCat = await submodel.find();
    let len = getAllCat.length+1;
    const name = req.body.name;
    const id = req.body.id;
    const checkName = await model.findOne({catname:catname})
    
    if(checkName){
        
            req.flash('success', 'Category already exists');
            res.render('category',{
                username: req.cookies.UserName,
                getAllCat: getAllCat,
                message2: req.flash('success'),
                editcat:''
            });
    } else {
        const result = {
            id: len,
            catname: catname
        }
        const savedata = new model(result);
        await savedata.save();
        getAllCat = await model.find();
        req.flash('success', 'Category added successfully');
        res.render('category',{
            username: req.cookies.UserName,
            getAllCat: getAllCat,
            message2: req.flash('success'),
            editcat:''
        }); 
    }
    

}



module.exports = savesubcat;