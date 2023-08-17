const mongoose = require('mongoose');
const mainData = async ()=>{
    const url = "mongodb://127.0.0.1:27017/student"
    await mongoose.connect(url)
}
mainData()
const studentSchema = new mongoose.Schema({
    id:Number,
    name:String,
    email:String,
    password:String
})

const studentModel = mongoose.model('adminstudent',studentSchema)

module.exports = studentModel
