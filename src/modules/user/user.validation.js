import Joi from "joi"

// valodation from Add catigory
const addUserSchemaVal =Joi.object({

    name:Joi.string().min(2).max(40).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    rePassword:Joi.valid(Joi.ref("password")).required(),
    role:Joi.string().valid('user','admin')


})

const paramsIdVal =Joi.object({
    id:Joi.string().hex().length(24).required(),
    
})

const updateUserSchemaVal =Joi.object({
    id:Joi.string().hex().length(24).required(),

    name:Joi.string().min(2).max(40),
    email:Joi.string().email(),
    password:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    rePassword:Joi.valid(Joi.ref("password")),
    role:Joi.string().valid('user','admin')



})

export {
    addUserSchemaVal,
    paramsIdVal,
    updateUserSchemaVal
}