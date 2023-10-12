const mongoose = require('mongoose');

const data = async () => {

    const url = 'mongodb://127.0.0.1:27017/adminpanel';
    await mongoose.connect(url);

};

data();

const user = new mongoose.Schema({

    id: Number,
    name: {
        type: String,
         required: true,
          unique: false
    },
    number: {
        type: String,
         required: true,
          unique: true
    },
    email: String,
    password: String,
    otp:Number,
    token: String,
    role_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'role' },
    google_id: String,
    image:String

}) 

const model = new mongoose.model('users',user);

module.exports = {model,user};
