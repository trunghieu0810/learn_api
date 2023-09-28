const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const typeSchema  = new Schema({
    type: String,
},
    { timestamps: true }
);

const Category = mongoose.models.categories || mongoose.model('categories', typeSchema);
module.exports = Category;