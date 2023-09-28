import dbConnect from '../../../utils/mongodb.js';
import User from '../../../models/users.js';
import Cart from '../../../models/cart.js'
import { JWTAuthToken } from '../../../helper/JWT.js';
const bcrypt = require("bcrypt");


dbConnect();
export default async (req, res) => {
    const { method } = req;
    // Đăng ký with google
    switch (method) {
        case 'POST':
            try {
                const mail = req.body.email
                const name = req.body.name
                const googleId = req.body.googleId
                const img = req.body.imageUrl
                const isUsername = await User.findOne({ username: 'googleId' + googleId }).exec()
                const isMail = await User.findOne({ mail: mail }).exec()
                if (isMail || isUsername) {
                    res.status(200).send(JSON.stringify({
                        success: true,
                        message: 'Mail đã được đăng ký',
                        status: 0,
                    }))
                } else {
                    User.create({
                        username: 'googleId' + googleId,
                        mail: mail,
                        name: name,
                        avatar: img
                    })
                        .then(result => {
                            if (result) {
                                console.log(result)
                                var newCart = new Cart({
                                        user: result._id,
                                    listProduct: []
                                })
                                newCart.save()
                                    .then(dataCart => {
                                        res.status(200).send(JSON.stringify({
                                            success: true,
                                            message: 'Đăng ký tài khoản thành công',
                                            status: 1,
                                            data: result,
                                            token: JWTAuthToken({ username: 'googleId' + googleId })
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
    // res.status(200).json({ name: 'John Doe' })
}
