
import jwt from 'jsonwebtoken'
import { JWTSECRET } from '../utils/constants';
const tokenverify = async (req, res, next) => {
    // console.log(req.headers['authorization']);

    const token = req.headers['authorization']
    // const 
    if (!token) {
        res.status(403).send({
            err: "Unauthorized"
        })
    } else {
        const usertoken = token.split(' ')[1];
        try {
            const user = jwt.verify(usertoken, JWTSECRET);
            // console.log("Decoded ", user);
            req.user = user
            next()
        } catch (err) {
            if (err.name == "TokenExpiredError") {
                res.status(400).json({ status: false, err: "Unauthorized", message: "Auth Token Expired" })
            } else if (err.name == "JsonWebTokenError") {
                res.status(400).json({ status: false, err: "Unauthorized", message: "Auth Token Expired" })
            } else {
                res.status(400).json({ status: false, err: "Unauthorized", message: err.message | "Token Error" })
            }
        }

    }
}

export default tokenverify