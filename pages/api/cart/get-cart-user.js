import dbConnect from '../../../utils/mongodb.js';
import mongoose from 'mongoose'
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';
import Cart from '../../../models/cart.js';

dbConnect();
const GetCartUser = async (req, res, data) => {
    const { method } = req;
    // Refresh
    switch (method) {
        case 'POST':
            const id = mongoose.Types.ObjectId(req?.body?.id);
            try {
                if (id) {
                    Cart.findOne({ user: id }).populate({
                        path: 'listProduct',
                        populate: { path: 'product' }
                    })
                        .then(result => {
                            console.log(result)
                            res.status(200).send(JSON.stringify({
                                success: true,
                                cart: result,
                                message: 'Get cart success'
                            }))
                        })
                        .catch(err => {
                            res.status(200).send(JSON.stringify({
                                success: false,
                                message: 'Get cart failed'
                            }))
                        })
                } else {
                    res.status(200).send(JSON.stringify({
                        success: false,
                        status: 401,
                        refresh: 'Token hết hạn sử dụng'
                    }))
                }

            }
            catch (error) {
                console.log("error", error)
                res.status(400).json({ success: false });
            }
            break;

        default:
            res.status(400).send(JSON.stringify({ success: false }));
    }
}


export default AuthMiddleware(GetCartUser)