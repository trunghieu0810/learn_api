import dbConnect from '../../../utils/mongodb.js';
import User from '../../../models/users.js';
import Cart from '../../../models/cart.js'
import { JWTAuthToken } from '../../../helper/JWT.js';
const bcrypt = require("bcrypt");
const saltRounds = 10;

dbConnect();
export default async (req, res) => {
    const { method } = req;

    // Đăng ký tài khoản
    switch (method) {
        case 'POST':
            try {
                const username = req.body.username
                const password = bcrypt.hashSync(req.body.password, saltRounds)
                const mail = req.body.mail
                const isMail = await User.findOne({ mail: mail }).exec()
                const isUsername = await User.findOne({ username: username }).exec()
                if (isMail) {
                    res.status(200).send(JSON.stringify({
                        success: true,
                        message: 'Mail đã được đăng ký',
                        status: 0,
                    }))
                } else if (isUsername) {
                    res.status(200).send(JSON.stringify({
                        success: true,
                        message: 'Tài khoản đã được đăng ký',
                        status: 0,
                    }))
                } else {
                    User.create({
                        username,
                        mail,
                        password
                    })
                        .then(result => {
                            if (result) {
                                const cart = new Cart({
                                    user: result._id
                                })
                                cart.save()
                                    .then(dataCart => {
                                        res.status(200).send(JSON.stringify({
                                            success: true,
                                            message: 'Đăng ký tài khoản thành công',
                                            status: 1,
                                            data: result,
                                            token: JWTAuthToken({ username })
                                        }))
                                    })
                                    .catch(err => {
                                        res.status(400).json({ success: false });
                                    })
                            }
                        })
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
