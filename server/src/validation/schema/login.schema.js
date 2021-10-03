import Joi from '@hapi/joi'
export const loginSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    photoUrl: Joi.string(),
    phoneNumber: Joi.number().empty("").allow(null)
})