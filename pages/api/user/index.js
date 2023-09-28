import dbConnect from '../../../utils/mongodb.js';
import User from '../../../models/users.js';
import { Result } from 'postcss';
const mongoose = require('mongoose');

dbConnect();
export default async (req, res) => {
    const { method } = req;

    // CODE các API ở đây
    switch (method) {
        case 'GET':
            try {
                console.log('GET')
                const user = await User.find({});
                res.status(200).json({ success: true, data: user });
            }
            catch (error) {
                console.log("error", error)
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                console.log('POST')
                console.log("req.body", req.body);
                const isMail = await User.findOne({ mail: req.body.mail }).exec()
                const isUsername = await User.findOne({ username: req.body.username }).exec()
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
                        username: req.body.username,
                        mail: req.body.mail,
                        password: req.body.password
                    })
                        .then(result => {
                            if (result) {
                                res.status(200).send(JSON.stringify({
                                    success: true,
                                    message: 'Đăng ký tài khoản thành công',
                                    status: 1,
                                    data: result
                                }))
                            }
                        })
                }
            }
            catch (error) {
                console.log("error", error)
                res.status(400).json({ success: false });
            }
            break;
        // Ở đây muốn tìm trường gì thì viết tên trường đó vào req.body
        // Đã test = postman, còn axios thì chưa :vv
        case 'PATCH':
            try {
                console.log("req.body", req.body);
                const user = await User.find(req.body);
                console.log("user", user)
                res.status(200).json({ success: true, data: user });
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
