import dbConnect from '../../../utils/mongodb.js';
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';
import Receipt from '../../../models/receipt'

dbConnect();
const GetAllReceipt = async (req, res, data) => {
    const { method } = req;
    switch (method) {
        case 'GET':
            try {
                console.log("get thành công" + data.username)
                const user = await User.findOne({username: data.username})
                if (user.role == 'admin') {
                    const receipts = await Receipt.find().exec()
                    res.status(200).send(JSON.stringify({
                        isAdmin: true,
                        receipts
                    }))
                } else {
                    res.status(200).send(JSON.stringify({
                        isAdmin: false,
                    }))
                }

            }
            catch (error) {
                throw new Error("Create receipt fail");
            }
            break;
        default:
            res.status(400).send(JSON.stringify({ success: false }));
    }
}

export default AuthMiddleware(GetAllReceipt)