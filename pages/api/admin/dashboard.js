import dbConnect from '../../../utils/mongodb.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';
import User from '../../../models/users.js';
import Receipt from '../../../models/receipt'
import Product from '../../../models/product'

dbConnect();
const Dashboard = async (req, res, data) => {
    const { method } = req;
    switch (method) {
        case 'GET':
            try {
                const user = await User.findOne({ username: data.username })

                if (user.role == 'admin') {
                    const users = await User.find().exec()
                    const receipts = await Receipt.find().exec()
                    const products = await Product.find().exec()
                    res.status(200).send(JSON.stringify({
                        users,
                        receipts,
                        products
                    }))
                } else {
                    res.status(200).send(JSON.stringify({
                        isAdmin: false,
                    }))
                }

            }
            catch (error) {
                res.status(401).send(JSON.stringify({
                    status: 401
                }))
            }
            break;
        default:
            res.status(400).send(JSON.stringify({ success: false }));
    }
}

export default AuthMiddleware(Dashboard)