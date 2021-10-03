import express from 'express'
import { login, tokenisverified } from '../controllers/auth/auth.controller'
import { deviceTokenValidate } from '../validation/auth/token.validate';
import validate from '../middlewares/validate'
import { loginSchema } from '../validation/schema/login.schema'
import tokenverify from '../middlewares/tokenverify';
const router = express.Router();


router.post('/login', deviceTokenValidate, validate(loginSchema), login)
router.get('/verifytoken', tokenverify, tokenisverified)
export default router