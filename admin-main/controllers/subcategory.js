const express = require('express');
const submodel = require('../models/subCategoryModel');

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
    // let len = getAllCat.length+1;
    const name = req.body.name;
    const id = req.body.cat_id;
    const checkName = await submodel.findOne({name:name})
    
    // if(checkName){  
    //     res.status(300).send("Subcategory already exists")      
            // req.flash('success', 'Subategory already exists');
            // res.render('category',{
            //     username: req.cookies.UserName,
            //     getAllCat: getAllCat,
            //     message2: req.flash('success'),
            //     editcat:''
            // });
    //} else {

        const result = {
            cat_id: id,
            name: name
        }
        console.log("isd is "+id);
        console.log("name is "+name);
        const savedata = new submodel(result);
        await savedata.save();
        
        getAllCat = await submodel.find();
        res.json(getAllCat);
        // res.status(200).send("Subcategory saved successfully")
        // req.flash('success', 'Category added successfully');
        // res.render('category',{
        //     username: req.cookies.UserName,
        //     getAllCat: getAllCat,
        //     message2: req.flash('success'),
        //     editcat:''
        // }); 
   // }
    

}

const allSubCat = async(req,res) => {
    submodel.find()
    .populate("cat_id")
    .then(p=>console.log(p))
    .catch(error=>console.log(error));
}


module.exports = {savesubcat,allSubCat};