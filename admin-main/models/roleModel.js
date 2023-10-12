const mongoose = require('mongoose');
const data = async () => {
    const url = 'mongodb://127.0.0.1:27017/adminpanel';
    await mongoose.connect(url);
};
data();

const role = new mongoose.Schema({
    rolename: {
        type: String,
        required: true,
        unique: true
    },
    isActive:{
        type: Boolean        
    }
}) 

const model = new mongoose.model('role',role);
module.exports = model;
