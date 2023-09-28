import dbConnect from '../../../utils/mongodb.js';
import mongoose from 'mongoose'
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';
import Receipt from '../../../models/receipt.js';

dbConnect();
const GetPurchasedBook = async (req, res, data) => {
    const { method } = req;
    // Refresh
    switch (method) {
        case 'POST':
            const id = mongoose.Types.ObjectId(req?.body?.id);
            try {
                Receipt.find({ user: id })
                    .then(result => {
                        console.log(result)
                        let idPurchased = []
                        let productPurchased = []
                        result.map((receipt, index) => {
                            receipt.listProduct.map(product => {
                                console.log(product.product.slug)
                                if (!idPurchased.includes(product.product.slug)) {
                                    idPurchased.push(product.product.slug)
                                    productPurchased.push(product.product)
                                }
                            })
                        })
                        
                        if (result) {
                            res.status(200).send(JSON.stringify({
                                success: true,
                                products: productPurchased,
                                message: 'Get receipt purchased success'
                            }))
                        } else {
                            res.status(200).send(JSON.stringify({
                                success: false,
                                status: 401,
                                refresh: 'Get receipt purchased fail'
                            }))
                        }
                    })
                    .catch(err => {
                        res.status(200).send(JSON.stringify({
                            success: false,
                            status: 401,
                            err: err,
                            refresh: 'Get receipt user fail'
                        }))
                    })

            }
            catch (error) {
                throw new Error("Create receipt fail");
            }
            break;
        default:
            res.status(400).send(JSON.stringify({ success: false }));
    }
}

export default AuthMiddleware(GetPurchasedBook)