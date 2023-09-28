const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema  = new Schema({
    title: String,
    introduction: String,
    price: Number,
    historyPrice: [],
    imgList: [],
    categoryID: [],
    tagID: [],
    importDate: Date,
    quantity: Number,
    publisher: String,
    format: String,
    publishYear: Number,
    detailInfomation: String,
    pageAmount: Number,
    size: String,
    author: String,
    slug: String,
    purchased: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
);

const Product = mongoose.models.products || mongoose.model('products', productSchema);
module.exports = Product;