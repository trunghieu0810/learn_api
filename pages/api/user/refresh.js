import dbConnect from '../../../utils/mongodb.js';
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';

dbConnect();
const Refresh = async (req, res, data) => {
    const { method } = req;

    // Refresh
    switch (method) {
        case 'POST':
            try {
                console.log("data", data)
                console.log(data['0']);
                console.log(data.username)
                const username = data.username;
                if(username) {
                    await User.findOne({ username }).then(result => {
                        if (result) {
                            res.status(200).send(JSON.stringify({
                                success: true,
                                status: 1,
                                message: 'Refresh ok',
                                data: result,
                                token: JWTAuthToken({ username: username })
                            }))
                        }
                    })
                } else {
                    res.status(200).send(JSON.stringify({
                        success: false,
                        status: 401,
                        refresh: 'Token hết hạn sử dụng'
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
}


export default AuthMiddleware(Refresh)