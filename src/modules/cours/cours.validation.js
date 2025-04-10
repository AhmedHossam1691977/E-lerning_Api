import Joi from "joi"



// valodation from Add catigory
const coursVal =Joi.object({

    name:Joi.string().min(2).max(40).required(),
    description:Joi.string().min(2).max(1000).required(),
    price:Joi.number().integer().required(),
    file:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required()
    }).required(),
    payPy:Joi.string().hex().length(24).required(),


})

const paramsIdVal =Joi.object({
    id:Joi.string().hex().length(24).required(),
    
})

const ubdateVal =Joi.object({
    id:Joi.string().hex().length(24).required(),

    name:Joi.string().min(2).max(40),
    description:Joi.string().min(2).max(1000),
    price:Joi.number().integer(),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/jpeg','image/png','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required()
    }),

})

export {
    coursVal,
    paramsIdVal,
    ubdateVal
}