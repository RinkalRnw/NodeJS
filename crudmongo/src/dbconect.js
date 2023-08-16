const mongoose = require('mongoose')

// async function maindata(){

// }
const maindata = async () =>{
    const url = "mongodb://127.0.0.1:27017/student"
    const connect = await mongoose.connect(url)

    const empSchema = new mongoose.Schema({
        id:Number,
        name:String,
        age:Number,
        salary:Number
    })

    const empModel = new mongoose.model('employee',empSchema)    
    
    let empdata = new empModel({
        id:1,
        name:"testemp",
        age:20,
        salary:25000
    })

    let res = await empdata.save();
    console.log("Data inserted successfully"+res)
    
}

maindata();
// const userSchema 