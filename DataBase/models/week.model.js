import mongoose from "mongoose";


const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'title is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short product title'],
        maxLength: [200, 'too long product title'],

    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    coursId: {
        type:mongoose.Types.ObjectId,
        ref:"cours"
    },
    weekNumber:Number,
    dateOfWeek:Date

}, { timestamps: true ,toJSON:{virtuals:true}})





schema.virtual('allLesson',{
    ref:'lesson',
    localField:"_id",
    foreignField:'weekId'
})

schema.pre("findOne",function(){

    this.populate('allLesson')
    
})



schema.virtual('qustation',{
    ref:'impoetantQuestion',
    localField:"_id",
    foreignField:'weekId'
})

schema.pre("findOne",function(){

    this.populate('qustation')
    
})



schema.virtual('Exam',{
    ref:'Exam',
    localField:"_id",
    foreignField:'weekId'
})

schema.pre("findOne",function(){

    this.populate('Exam')
    
})


export const weekModel = mongoose.model('week', schema)



