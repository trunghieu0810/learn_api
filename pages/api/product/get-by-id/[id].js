import dbConnect from '../../../../utils/mongodb.js';
import mongoose from 'mongoose'
import User from '../../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../../helper/JWT.js';
import Receipt from '../../../../models/receipt.js';
import Cart from '../../../../models/cart.js';
import Category from '../../../../models/category.js';
import Product from '../../../../models/product.js';
dbConnect();

const getProductByID = async(id, req, res) => {
    // console.log("req.body", req.body);
    var productList = [];
    console.log("id", id);
    await Product.findById(id).exec()
        .then((data)=> {
            productList = data;
        })
        .catch((error) => {
            return res.status(200).send({
                success: false,
                message: error
            })
        })
    res.status(200).send({
        success: true,
        product: productList,
    })
}

export default async(req, res) => {
    const {
        query: {id},
        method
    } = req
    // console.log("method",method);
    switch (method){
        case 'GET': 
            try{
                getProductByID(id, req, res);
            }
            catch(error){
                return res.status(400).json({success: false});
            }
            break;
        case 'PUT':
            res.status(200).send({
                run: true
            })
            break;
        case 'DELETE':
            res.status(200).send({
                run: true
            })
            break;
        default: 
            return res.status(400).json({success: false});
    }
}