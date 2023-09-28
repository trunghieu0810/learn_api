import dbConnect from '../../../utils/mongodb.js';
import mongoose from 'mongoose'
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';
import Cart from '../../../models/cart.js';

dbConnect();
const QuantityChange = async (req, res, data) => {
    const { method } = req;
    // Refresh
    switch (method) {
        case 'POST':
            const idUser = mongoose.Types.ObjectId(req?.body?.id);
            const type = req.body.type
            const idProduct = req.body.idProduct
            try {
                if (idUser) {
                    let cart = await Cart.findOne({ user: idUser }).populate({
                        path: 'listProduct',
                        populate: { path: 'product' }
                    })
                    if (type == 'DELETE') {
                        cart.listProduct = cart.listProduct.filter(value => value.product._id != idProduct)
                    } else if (type == 'PLUS') {
                        cart.listProduct = cart.listProduct.map(value => {
                            if (value.product._id == idProduct) {
                                value.quantity += 1
                            }
                            return value
                        })
                    } else {
                        cart.listProduct = cart.listProduct.map(value => {
                            if (value.product._id == idProduct) {
                                value.quantity -= 1
                            }
                            return value
                        })
                    }
                    cart.save()
                        .then(result => {
                            if (result) {
                                res.status(200).send(JSON.stringify({
                                    type,
                                    result,
                                    success: true,
                                    message: 'Thành công!'
                                }))
                            }
                        })
                        .catch(err => {
                            res.status(401).send(JSON.stringify({
                                success: false,
                                message: 'Thất bại!'
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


export default AuthMiddleware(QuantityChange)