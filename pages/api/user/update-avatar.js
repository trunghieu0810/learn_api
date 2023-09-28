import dbConnect from '../../../utils/mongodb.js';
import User from '../../../models/users.js';
import { JWTAuthToken, AuthMiddleware } from '../../../helper/JWT.js';

dbConnect();
const UpdateAvatar = async (req, res, data) => {
    const { method } = req;

    // Update Avatar
    switch (method) {
        case 'POST':
            try {
                console.log(data);
                console.log(data['0']);
                const username = data.username
                const avatar = req.body.avatar
                await User.findOneAndUpdate(
                    { username },
                    {
                        $set: {
                            avatar
                        }
                    },
                    { returnOriginal: false }

                ).exec()
                    .then(result => {
                        if (result) {
                            res.status(200).send(JSON.stringify({
                                success: true,
                                message: 'Đổi avatar thành công',
                                status: 1,
                                token: JWTAuthToken({username: username}),
                                data: result
                            }))
                        } else {
                            res.status(400).send(JSON.stringify({
                                success: true,
                                message: 'Đổi avatar thất bại',
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
}


export default AuthMiddleware(UpdateAvatar)