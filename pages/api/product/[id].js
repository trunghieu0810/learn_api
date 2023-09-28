import dbConnect from '../../../utils/mongodb.js';
import mongoose from 'mongoose'
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';
import Receipt from '../../../models/receipt.js';
import Cart from '../../../models/cart.js';
import Category from '../../../models/category.js';
import Product from '../../../models/product.js';
dbConnect();

const getProductBySlug = async(id, req, res) => {
    // console.log("req.body", req.body);
    var productList = [];
    console.log("id", id);
    await Product.find({
        "slug": id
    }).exec()
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
                getProductBySlug(id, req, res);
                // const user = await User.findById(id);
                // if(!user) {
                //     return res.status(400).json({success: false});
                // }
                // res.status(200).json({success: true, data: user});
            }
            catch(error){
                return res.status(400).json({success: false});
            }
            break;
        case 'PUT':
            try{
                const user = await User.findByIdAndUpdate(id, 
                    {
                        userID: req.body.userID,
                        name: req.body.name,
                        typeID: req.body.typeID,
                        views: req.body.views
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                if(!user) {
                    return res.status(400).json({success: false});
                }
                res.status(200).json({success: true, data: user});
            }
            catch(error){
                return res.status(400).json({success: false});
            }
            break;
        case 'DELETE':
            try {
                const deletedUser = await User.deleteOne({ _id: id });

                if (!deletedUser) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default: 
            return res.status(400).json({success: false});
    }
}