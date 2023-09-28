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
                const username = data.username
                const { name, phone, gender, birthday, province, district, commune } = req.body
                console.log(username)
                console.log(req.body)
                await User.findOneAndUpdate(
                    { username },
                    {
                        $set: {
                            name,
                            phone,
                            gender,
                            birthday: new Date(birthday),
                            province,
                            district,
                            commune
                        }
                    },
                    { returnOriginal: false }
                ).exec()
                    .then(result => {
                        if (result) {
                            res.status(200).send(JSON.stringify({
                                success: true,
                                message: 'Update thông tin thành công',
                                status: 1,
                                token: JWTAuthToken({ username: username }),
                                data: result
                            }))
                        } else {
                            res.status(400).send(JSON.stringify({
                                success: true,
                                message: 'Update thông tin thất bại',
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