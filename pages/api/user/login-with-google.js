import dbConnect from '../../../utils/mongodb.js';
import User from '../../../models/users.js';
import { JWTAuthToken } from '../../../helper/JWT.js';
const bcrypt = require("bcrypt");


dbConnect();
export default async (req, res) => {
    const { method } = req;

    // Login with google
    switch (method) {
        case 'POST':
            try {
                const googleId = req.body.googleId
                const user = await User.findOne({ username: 'googleId' + googleId }).exec()
                if (user) {
                    res.status(200).send(JSON.stringify({
                        success: true,
                        message: 'Đăng nhập thành công',
                        status: 1,
                        data: user,
                        token: JWTAuthToken({ username: 'googleId' + googleId })
                    }))
                } else {
                    res.status(200).send(JSON.stringify({
                        success: true,
                        message: 'Tài khoản không tồn tại',
                        status: 0,
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
    // res.status(200).json({ name: 'John Doe' })
}
