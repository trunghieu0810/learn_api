import dbConnect from '../../../utils/mongodb.js';
import mongoose from 'mongoose'
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';
import Receipt from '../../../models/receipt.js';
import Cart from '../../../models/cart.js';
import Category from '../../../models/category.js';
import Product from '../../../models/product.js';
dbConnect();

const addToCart = async(req, res) => {
    console.log("req.body", req.body);
    let cardData;
    await Cart.findOne({
        "user": req.body.userID
    }).exec()
        .then(data => {
            console.log("data", data)
            cardData = data;
        })
        .catch((err) => {
            return res.status(400).send({
                success: false,
                error: err.message  
            })
        })
    let listProduct = cardData.listProduct;
    let isFind = false;
    for(var i = 0; i < listProduct.length; i++){
        if(listProduct[i].product == req.body.productID){
            listProduct[i].amount += req.body.amount;
            isFind = true;
            break;
        }
    }
    if(!isFind) {
        listProduct.push({
            product : req.body.productID,
            quantity: req.body.amount,
            _id: new mongoose.Types.ObjectId(),
        })
    }

    Cart.findOneAndUpdate({"user": req.body.userID}, {
        listProduct: listProduct,
    })
        .then(data => {
            return res.status(200).send({
                success: true
            })
        })
        .catch((err) => {
            return res.status(400).send({
                success: false,
                error: err.message  
            })
        })
}


export default async(req, res) => {
    const {
        query: {id},
        method
    } = req
    switch (method){
        case 'GET': 
            break;
        case 'POST':
            addToCart(req, res);
            break;
        case 'PUT':
            break;
        case 'DELETE':
            break;
        default: 
            return res.status(400).json({success: false});
    }
}