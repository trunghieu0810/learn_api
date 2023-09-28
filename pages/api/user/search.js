import dbConnect from '../../../utils/mongodb.js';
import { JWTAuthToken } from '../../../helper/JWT.js';
const bcrypt = require("bcrypt");
import Product from '../../../models/product'
import RemoveAccents from '../../../helper/RemoveAccents'
dbConnect();
export default async (req, res) => {
    const { method } = req;
    console.log(req.query)
    console.log(method)
    // Đăng nhập
    switch (method) {
        case 'GET':
            try {
                const search = RemoveAccents(req.query?.search)
                const products = await Product.find().exec()
                console.log(search)
                const result = products.filter((product) => {
                    if(RemoveAccents(product.title).includes(search)) {
                        return product
                    }
                    if(RemoveAccents(product.introduction).includes(search)) {
                        return product
                    }
                    if(RemoveAccents(product.author).includes(search)) {
                        return product
                    }
                })
                res.status(200).send(JSON.stringify({
                    success: 1,
                    products: result
                }))
            }
            catch (error) {
                console.log("error", error)
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).send(JSON.stringify({ success: false }));
    }
    // res.status(200).json({ name: 'John Doe' })
}
