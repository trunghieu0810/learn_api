import dbConnect from '../../../utils/mongodb.js';
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';
import Receipt from '../../../models/receipt'
import Product from '../../../models/product'

dbConnect();
const GetAllReceipt = async (req, res, data) => {
    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                const user = await User.findOne({ username: data.username })
                if (user.role == 'admin') {
                    const receipt = await Receipt.findById(req.body?.receipt?._id).exec()
                    receipt.deliveryStatus = req.body?.deliveryStatus
                    let isFound = false
                    let message
                    const products = await Product.find().exec()
                    console.log(products)
                    if (req.body?.deliveryStatus == "Đã giao") {
                        products.map((product, key) => {
                            receipt.listProduct.map(productPurchased => {
                                if (product.slug === productPurchased.product.slug) {
                                    console.log("Trùng nhau nè ")
                                    if (products[key].quantity >= productPurchased.quantity) {
                                        products[key].quantity -= productPurchased.quantity
                                        products[key].purchased += productPurchased.quantity
                                    } else {
                                        message = productPurchased.product.title + ' chỉ còn ' + product.quantity + ' sản phẩm'
                                        isFound = true
                                    }
                                }
                            })
                        })
                    }

                    if (isFound) {
                        res.status(202).send(JSON.stringify({
                            status: 202,
                            message: message
                        }))
                    } else {
                        products.forEach(product => {
                            product.save()
                        })

                        receipt.save()
                            .then(result => {
                                res.status(200).send(JSON.stringify({
                                    isAdmin: true,
                                    receipt: result
                                }))
                            })
                            .catch(err => {
                                res.status(401).send(JSON.stringify({
                                    status: 401,
                                    err: err
                                }))
                            })
                    }
                } else {
                    res.status(200).send(JSON.stringify({
                        isAdmin: false,
                    }))
                }

            }
            catch (err) {
                res.status(401).send(JSON.stringify({
                    status: 401,
                    err: err.message
                }))
            }
            break;
        default:
            res.status(400).send(JSON.stringify({ success: false }));
    }
}

export default AuthMiddleware(GetAllReceipt)