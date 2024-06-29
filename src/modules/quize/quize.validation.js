import Joi from "joi"

// valodation from Add catigory
const quzeVal =Joi.object({

    title: Joi.string().required(),
    questions: Joi.array().items(
        Joi.object({
        qu: Joi.string().required()  // assuming qu is of type string (ObjectId)
        } )
    ).required(),
    durationInMinutes: Joi.number().integer().min(1).required(),
    weekId: Joi.string().hex().length(24).required()

})

const paramsIdVal =Joi.object({
    id:Joi.string().hex().length(24).required(),
    
})

const ubdateVal =Joi.object({
    id:Joi.string().hex().length(24).required(),


    title: Joi.string().optional(),
    questions: Joi.array().items(
        Joi.object({
        qu: Joi.string().optional()  // assuming qu is of type string (ObjectId)
        } )
    ).optional(),
    durationInMinutes: Joi.number().integer().min(1).optional()

})

export {
    quzeVal,
    paramsIdVal,
    ubdateVal
}