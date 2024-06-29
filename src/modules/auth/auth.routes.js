import express from "express"
import { VerifyResetCode, changePassword, forgetPassword, protectedRoutes, resetPassword, signin, signup } from "./auth.controller.js"
import { validation } from "../../middleware/validation.js"
import { chickEmail } from "../../middleware/emailExist.js"
import { ForgetPassword, ResetPassword, changePasswordSchemaVal, signinSchemaVal, signupSchemaVal } from "./auth.validation.js"





const authRouter = express.Router()

authRouter.post('/signup',validation(signupSchemaVal),chickEmail,signup)
authRouter.post('/signin',validation(signinSchemaVal),signin)

authRouter.post('/forgetPassword',validation(ForgetPassword),forgetPassword)
authRouter.post('/verifyResetCode',VerifyResetCode)
authRouter.patch('/resetPassword',validation(ResetPassword),resetPassword)


authRouter.patch('/changePassword',protectedRoutes,validation(changePasswordSchemaVal),changePassword)


export default authRouter