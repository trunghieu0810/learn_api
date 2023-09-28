import dbConnect from '../../../utils/mongodb.js';
import mongoose from 'mongoose'
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';
import Receipt from '../../../models/receipt.js';
import Cart from '../../../models/cart.js';
import Category from '../../../models/category.js';

dbConnect();

const getCategory = async(req, res) => {
    // console.log("req.body", req.body);
    var categoryList = [];
    await Category.find().exec()
        .then((data)=> {
            categoryList = data;
        })
        .catch((error) => {
            return res.status(200).send({
                success: false,
                message: error
            })
        })
    res.status(200).send({
        success: true,
        categories: categoryList
    })
}

const addCategory = async(req, res) => {
    console.log("req.body", req.body);
    const category = new Category({
        type: req.body.type
    })
    if(category){
        await category.save()
            .then((data) => {

            })
            .catch(err => {
                throw new Error("Create product type fail");
            })
    }
    else {
        return res.status(401).json({
            success: false,
            status: 401,
            refresh: 'Create product type failed'
        })
    }
    getCategory(req, res);
}

const categoryController = async (req, res, data) => {
    const { method } = req;
    // Refresh
    switch (method) {
        case 'GET':
            await getCategory(req, res);
            break;
        case 'POST':
            await addCategory(req, res);
            break;
        case 'DELETE':
            res.status(200).send({
                run: true,
                ok: true
            })
            break;
        case 'PUT':
            res.status(200).send({
                run: true,
                ok: true
            })
            break;
        default:
            return res.status(400).json({ success: false });
    }
}

export default categoryController