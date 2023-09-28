import dbConnect from '../../../utils/mongodb.js';
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';
import Receipt from '../../../models/receipt'
import { result } from 'lodash';

dbConnect();
const ChangeRoleUser = async (req, res, data) => {
    const { method } = req;
    console.log(method)
    console.log(req.body.usersDelete)
    switch (method) {
        case 'POST':
            try {
                const user = await User.findOne({ username: data.username })
                const userDelete = await User.findById(req.body.usersDelete._id)
                if (user.role == 'admin') {
                    if (userDelete.username == 'admin') {
                        res.status(200).send(JSON.stringify({
                            message: 'Tài khoản này không được phép sửa',
                            status: 0
                        }))
                    } else {
                        await User.findOneAndUpdate(
                            {
                                username: userDelete.username
                            },
                            {
                                $set: {
                                    role: userDelete.role == 'admin' ? 'user' : 'admin'
                                }
                            },
                            { returnOriginal: false }
                        ).exec()
                            .then(result => {
                                if (result) {
                                    res.status(200).send(JSON.stringify({
                                        message: 'Thay đổi quyền thành công',
                                        status: 1,
                                        data: result
                                    }))
                                } else {
                                    res.status(401).send(JSON.stringify({
                                        message: 'Lỗi hệ thống',
                                        status: 0,
                                    }))
                                }
                            })
                    }

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

export default AuthMiddleware(ChangeRoleUser)