import dbConnect from '../../../utils/mongodb.js';
import mongoose from 'mongoose'
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';
import Receipt from '../../../models/receipt.js';

dbConnect();
const GetOrderList = async (req, res, data) => {
    const { method } = req;
    // Refresh
    switch (method) {
        case 'GET':
            const id = mongoose.Types.ObjectId(req?.query?.id);
            try {
                console.log(id)
                Receipt.find({ user: id })
                    .then(result => {
                        console.log('result: ' + result)
                        if (result) {
                            res.status(200).send(JSON.stringify({
                                success: true,
                                receipts: result,
                                message: 'Get receipt user success'
                            }))
                        } else {
                            res.status(200).send(JSON.stringify({
                                success: false,
                                status: 401,
                                refresh: 'Get receipt user fail'
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

export default AuthMiddleware(GetOrderList)