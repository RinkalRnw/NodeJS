const mongoose = require('mongoose');

const maindata = async () =>{
    const url = "mongodb://127.0.0.1:27017/student"
    const connect = await mongoose.connect(url)
    
}
maindata();
const empSchema = new mongoose.Schema({
    id:Number,
    name:String,
    email:String,
    password:String
})

empModel = new mongoose.model('testemp',empSchema)

module.exports = empModel