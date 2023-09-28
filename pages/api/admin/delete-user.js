import dbConnect from '../../../utils/mongodb.js';
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';
import Receipt from '../../../models/receipt'
import Cart from '../../../models/cart'
dbConnect();
const DeleteUser = async (req, res, data) => {
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
                            message: 'Tài khoản này không được phép xóa',
                            status: 0
                        }))
                    } else {
                        console.log(userDelete.username)
                        await Cart.findOneAndDelete({user: userDelete._id}).exec()
                        await User.findOneAndDelete({ username: userDelete.username })
                            .then(result => {
                                if (result) {
                                    res.status(200).send(JSON.stringify({
                                        message: 'Xóa thành công tài khoản',
                                        status: 1,
                                        data: result
                                    }))
                                }
                                else {
                                    res.status(200).send(JSON.stringify({
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
            catch {
                res.status(401).send(JSON.stringify({
                    status: 401,
                    err: 'ERROR'
                }))
            }
            break;
        default:
            res.status(400).send(JSON.stringify({ success: false }));
    }
}

export default AuthMiddleware(DeleteUser)