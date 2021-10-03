

import UserModel from "../../models/UserModel";

export const submitUser = async (res, payload) => {
    try {
        await UserModel.create(payload);
        return { success: true }
    } catch (err) {
        console.log("ERROR C ", err.message);

        // return res.status(500).json({ error: "failed", message: err.message || "INTERNAL SERVER ERR" })
        return { success: false, err: err.message || "INTERNAL SERVER ERR" };
    }
}

export const isUserExist = async (res, payload) => {
    try {
        const user = await UserModel.findOne({ email: payload.email });
        return { success: true, response: user }
    } catch (err) {
        console.log("ERROR C ", err.message);

        // return res.status(500).json({ error: "failed", message: err.message || "INTERNAL SERVER ERR" })
        return { success: false, err: err.message || "INTERNAL SERVER ERR" };
    }
}
