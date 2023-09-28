import dbConnect from '../../../utils/mongodb.js';
import mongoose from 'mongoose'
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';
import Receipt from '../../../models/receipt.js';
import Cart from '../../../models/cart.js';

dbConnect();
const CreateNewReceipt = async (req, res, data) => {
    const { method } = req;
    // Refresh
    switch (method) {
        case 'POST':
            const user = mongoose.Types.ObjectId(req?.body?.user);
            try {
                if (user) {
                    console.log(res.body)
                    const receipt = new Receipt({ ...req.body })
                    if (receipt) {
                        receipt.save()
                            .then((result) => {
                                 Cart.findOneAndUpdate({ user }, { listProduct: [] }, (err, docs) => {
                                    if (err) {
                                        return res.status(200).json({
                                            success: false,
                                            status: 401,
                                            refresh: 'Create receipt success'
                                        })
                                    } else {
                                        return res.status(200).json({
                                            success: true,
                                            cart: result,
                                            message: 'Create receipt success'
                                        })
                                    }
                                })
                            })
                            .catch(err => {
                                throw new Error("Create receipt fail");
                            })
                    } else {
                        return res.status(200).json({
                            success: false,
                            status: 401,
                            refresh: 'Create receipt success'
                        })

                    }
                }
            }
            catch (error) {
                throw new Error("Create receipt fail");

            }
            break;
        case 'DELETE':
            const id = mongoose.Types.ObjectId(req?.body?.id);
            try {
                Receipt.findByIdAndUpdate(id, { deliveryStatus: 'Đã hủy' }, (err, docs) => {
                    if (err) {
                        return res.status(200).json({
                            success: false,
                            status: 401,
                            message: 'Delete receipt fail'
                        })

                    } else {
                        return res.status(200).json({
                            success: true,
                            receipt: docs,
                            message: 'Delete receipt success'
                        })

                    }
                })
            } catch (err) {
                throw new Error("Create receipt fail");

            }
            break;
        case 'PUT':
            const idReceipt = mongoose.Types.ObjectId(req?.body?.id);
            try {
                Receipt.findByIdAndUpdate(idReceipt, { deliveryStatus: 'Chờ xác nhận' }, (err, docs) => {
                    if (err) {
                        return res.status(200).json({
                            success: false,
                            status: 401,
                            refresh: 'Buy receipt again fail'
                        })
                    } else {
                        return res.status(200).json({
                            success: true,
                            receipt: docs,
                            message: 'Buy receipt again success'
                        })
                    }
                })
            } catch (err) {
                throw new Error("Create receipt fail");

            }
            break;
        default:
            return res.status(400).json({ success: false });
    }
}

export default AuthMiddleware(CreateNewReceipt)