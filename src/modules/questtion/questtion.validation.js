import Joi from "joi"

// valodation from Add catigory
const questionVal =Joi.object({

    questionText: Joi.string().min(10).required(),
    answers: Joi.array().items(
        Joi.object({
            answerText: Joi.string().required(),
            isCorrect: Joi.boolean().required()
        })
    ).required(),
    courseId: Joi.string().hex().length(24).required(),
    lessonId: Joi.string().hex().length(24).required(),
    weekId: Joi.string().hex().length(24).required()


})

const paramsIdVal =Joi.object({
    id:Joi.string().hex().length(24).required(),
    
})

const ubdateVal =Joi.object({
    id:Joi.string().hex().length(24).required(),

    questionText: Joi.string().min(10).optional(),
    answers: Joi.array().items(
        Joi.object({
            answerText: Joi.string().optional(),
            isCorrect: Joi.boolean().optional()
        })
    ).optional(),
    courseId: Joi.string().hex().length(24).optional(),
    lessonId: Joi.string().hex().length(24).optional()

})

export {
    questionVal,
    paramsIdVal,
    ubdateVal
}