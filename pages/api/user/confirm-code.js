import dbConnect from '../../../utils/mongodb.js';
import User from '../../../models/users.js';
const bcrypt = require("bcrypt");
const saltRounds = 10

dbConnect();
export default async (req, res) => {
    const { method } = req;

    // Xác nhận code và đổi mật khẩu
    switch (method) {
        case 'POST':
            try {
                const password = bcrypt.hashSync(req.body.password, saltRounds)
                const mail = req.body.mail

                await User.findOneAndUpdate(
                    { mail },
                    {
                        $set: {
                            password
                        }
                    },
                    { returnOriginal: false }

                ).exec()
                    .then(result => {
                        if (result) {
                            res.status(200).send(JSON.stringify({
                                success: true,
                                message: 'Đổi mật khẩu thành công',
                                status: 1,
                            }))
                        } else {
                            res.status(400).send(JSON.stringify({
                                success: true,
                                message: 'Đổi mật khẩu không thành công',
                                status: 0,
                            })) 
                        }
                    })

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
