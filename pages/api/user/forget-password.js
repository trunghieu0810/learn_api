import dbConnect from '../../../utils/mongodb.js';
import User from '../../../models/users.js';
const bcrypt = require("bcrypt");


dbConnect();
export default async (req, res) => {
    const { method } = req;

    // Xác nhận xem email có tồn tại hay không
    switch (method) {
        case 'POST':
            try {
                const mail = req.body.mail

                const isMail = await User.findOne({ mail }).exec()
                if (isMail) {
                    res.status(200).send(JSON.stringify({
                        success: true,
                        message: 'Gửi mã code về mail thành công',
                        status: 1,
                    }))
                } else {
                    res.status(200).send(JSON.stringify({
                        success: true,
                        message: 'Email không tồn tại',
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
