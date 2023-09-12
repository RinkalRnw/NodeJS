const mongoose = require('mongoose')

exports.connectDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/adminpanel').then(e=>console.log('Connect to db'))
    .catch(e=>console.log(e));
}

const userSchema = new mongoose.Schema({
    username:String,
    password:String,

})
exports.User = mongoose.model('User',userSchema)

