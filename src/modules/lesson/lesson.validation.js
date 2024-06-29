import Joi from "joi"

// valodation from Add catigory
const lessonVal =Joi.object({

    title:Joi.string().min(2).max(40).required(),
    description:Joi.string().min(2).max(1000).required(),
    weekId:Joi.string().hex().length(24).required(),
    coursId:Joi.string().hex().length(24).required(),
    
    file:Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('video/mp4', 'video/webm', 'video/ogg').required(),
        size: Joi.number().max(52428800).required(), // الحجم الأقصى 50 ميجابايت
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    }).optional()

})

const paramsIdVal =Joi.object({
    id:Joi.string().hex().length(24).required(),
    
})

const ubdateVal =Joi.object({
    id:Joi.string().hex().length(24).required(),

    title:Joi.string().min(2).max(40).optional(),
    description:Joi.string().min(2).max(1000).optional(),
    weekId:Joi.string().hex().length(24).optional(),
    coursId:Joi.string().hex().length(24).optional(),
    
    video:Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('video/mp4', 'video/webm', 'video/ogg').required(),
        size: Joi.number().max(52428800).required(), // الحجم الأقصى 50 ميجابايت
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    }).optional()

})

export {
    lessonVal,
    paramsIdVal,
    ubdateVal
}