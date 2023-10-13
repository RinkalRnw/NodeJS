const mongoose = require('mongoose');
const  findOrCreate = require('mongoose-findorcreate')
const data = async () => {

    const url = 'mongodb://127.0.0.1:27017/adminpanel';
    await mongoose.connect(url);

};

data();

const User = new mongoose.Schema({

    //id: Number,
    name: {
        type: String,
        //  required: true,
          unique: false
    },
    number: {
        type: String,
        //  required: true,
        //   unique: true
    },
    email: String,
    password: String,
    otp:Number,
    token: String,
    role_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'role' },
    googleId: String,
    image:String

}) 


User.plugin(findOrCreate)
// const User = new mongoose.model('users',User);
const model = new mongoose.model('users',User);
module.exports = model;
