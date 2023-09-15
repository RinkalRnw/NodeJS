const mongoose = require('mongoose');

const data = async () => {

    const url = 'mongodb://127.0.0.1:27017/adminpanel';
    await mongoose.connect(url);

};

data();

const category = new mongoose.Schema({

    id: Number,
    catname: {
        type: String,
        required: true,
        unique: true
    }
}) 

const subCategory = new mongoose.Schema({
    name: String,
    categories: [{ type: mongoose.Types.ObjectId, ref: 'category' }]
  });

const model = new mongoose.model('category',category);
const submodel = new mongoose.model('subcategory',subCategory);

module.exports = {model,submodel};
