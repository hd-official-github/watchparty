import jwt from 'jsonwebtoken'
import { isUserExist, submitUser } from '../../services/auth/auth.service';
import { JWTSECRET } from '../../utils/constants';

export const login = async (req, res) => {
    try {
        const { id, name, email } = req.payload
        var token = jwt.sign({ id, name, email }, JWTSECRET, { expiresIn: '1h' });
        const response = await submitUser(res, req.payload)
        if (response.success) {
            return res.json({ access_token: token })
        } else {
            return res.status(500).json({ error: response.err })
        }
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }

};

export const tokenisverified = async (req, res) => {
    // console.log("TIV ", req.user);
    try {
        const result = await isUserExist(res, req.user)
        if (result.success) {
            return res.status(200).json({ status: true, user: req.user })
        } else {
            return res.status(500).json({ status: false, err: result.err })
        }
    } catch (err) {
        return res.status(500).json({ status: false, err: err.message })
    }



}



