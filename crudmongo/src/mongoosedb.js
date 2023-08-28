const mongoose = require('mongoose');
const mainData = async ()=>{
    const url = "mongodb://127.0.0.1:27017/student"
    await mongoose.connect(url)
    const studentSchema = new mongoose.Schema({
        id:Number,
        name:String,
        age:Number,
        qualification:String
    })
    
    const studentModel = mongoose.model('Student',studentSchema)
    //Insert record
    
    const insertDB = new studentModel({
        id:1,
        name:"Rinks",
        age:25,
        qualification:"BCA"
    })
    
    let result = await insertDB.save();
    console.log(result)
}


mainData()

