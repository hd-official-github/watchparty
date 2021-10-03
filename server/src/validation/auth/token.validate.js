import { DEVICE_ID } from "../../utils/constants";
import { ApiError } from "../../utils/Error.js";


export const deviceTokenValidate = (req, res, next) => {

    if (req.headers['device-token'] === DEVICE_ID) {
        // console.log(req);
        next();
    } else {

        throw new ApiError(403, "INVALID_DEVICE", res)
    }
}