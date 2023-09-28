import dbConnect from '../../../utils/mongodb.js';
import User from '../../../models/users.js';
import { JWTAuthToken } from '../../../helper/JWT.js';
const bcrypt = require("bcrypt");


dbConnect();
export default async (req, res) => {
    const { method } = req;

    // Đăng nhập
    switch (method) {
        case 'POST':
            try {
                const username = req.body.username
                const password = req.body.password

                const user = await User.findOne({ username: username }).exec()
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        res.status(200).send(JSON.stringify({
                            success: true,
                            message: 'Đăng nhập thành công',
                            status: 1,
                            data: user,
                            token: JWTAuthToken({ username })
                        }))
                    } else {
                        res.status(200).send(JSON.stringify({
                            success: true,
                            message: 'Sai mật khẩu',
                            status: 0,
                        }))
                    }
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
