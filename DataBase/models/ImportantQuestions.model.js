import mongoose from "mongoose";


const schema = new mongoose.Schema({
    questionText: {
                type: String,
                required: true
            },
            answers: [{
                answerText: {
                    type: String,
                    required: true
                },
                isCorrect: {
                    type: Boolean,
                    default:false
                }
            }],
            slug: {
                type: String,
                lowercase: true,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
           weekId: {
                type:mongoose.Types.ObjectId,
                ref:"week"
            },
            lessonId: {
                type:mongoose.Types.ObjectId,
                ref:"lesson"
            },


}, { timestamps: true, toJSON:{virtuals:true} })





// virtual populate for All review in the product 
schema.virtual('allQustion',{
    ref:'Exam',
    localField:"_id",
    foreignField:'questions'
})

schema.pre("findOne",function(){
    this.populate('allQustion')
    
})





export const impoetantQuestionModel = mongoose.model('impoetantQuestion', schema)



