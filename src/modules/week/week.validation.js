import Joi from "joi"

// valodation from Add catigory
const weekVal =Joi.object({

    title:Joi.string().min(2).max(40).required(),
    coursId:Joi.string().hex().length(24).required(),
    weekNumber:Joi.number().integer().required(),

})

const paramsIdVal =Joi.object({
    id:Joi.string().hex().length(24).required(),
    
})

const ubdateVal =Joi.object({
    id:Joi.string().hex().length(24).required(),

    title:Joi.string().min(2).max(40).optional(),
    coursId:Joi.string().hex().length(24).optional(),
    weekNumber:Joi.number().integer().optional(),

})

export {
    weekVal,
    paramsIdVal,
    ubdateVal
}