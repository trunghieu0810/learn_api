import { getAccessToken } from '../utils/cookies'

const jwt = require('jsonwebtoken') // Authentication & Authorization
const key = 'phiphuoc'



export const JWTAuthToken = (data) => {
    return (jwt.sign(
        { ...data },
        key,
        { expiresIn: '1h' }
    ))
}


export const JWTVerify = (token) => {
    try {
        var decoded = jwt.verify(token, key);
        return {
            status: 200,
            decoded
        }
    } catch (err) {
        return {
            status: 401,
            err
        }
    }
}


export const AuthMiddleware = (refresh) => {
    return async (req, res) => {
        try {
            var token;
            var name = '_jwt' + "=";
            if (typeof req.headers.cookie == 'undefined') {
                res.status(200).send({ success: 'true' });
                return;
            }
            var ca = req.headers.cookie.split(';');
            console.log("Đến đây rồi");
            for (const element of ca) {
                var c = element;
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) token = c.substring(name.length, c.length);
            }
            console.log(token)
            jwt.verify(token, key, (err, data) => {
                if (err) {
                    res.status(200).send(JSON.stringify({
                        success: false,
                        status: 401,
                        refresh: 'Token hết hạn sử dụng'
                    }))
                }
                if (data) {
                    return refresh(req, res, data)
                }
            })
        } catch (err) {
            console.log("error", err)
            return res.status(400).send(JSON.stringify({
                success: false,
                message: 'Refresh thất bại'
            }))
        }
    }

}