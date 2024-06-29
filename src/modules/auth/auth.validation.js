import Joi from "joi";


// validationv for signup
const signupSchemaVal =Joi.object({
    name:Joi.string().min(2).max(40).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    rePassword:Joi.valid(Joi.ref("password")).required(),
})


// validationv for signin
const signinSchemaVal =Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),

})



// changePassword
const changePasswordSchemaVal =Joi.object({
    password:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    newPassword:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    confirmPassword:Joi.valid(Joi.ref("newPassword")).required(),

})



const ForgetPassword =  Joi.object({
   email : Joi.string().email()
})


const ResetPassword =  Joi.object({
    email:Joi.string().email().required(),
    newPassword:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    confirmPassword:Joi.valid(Joi.ref("newPassword")).required(),
 })
export {
    signupSchemaVal,
    signinSchemaVal,
    changePasswordSchemaVal,
    ForgetPassword,
    ResetPassword
}