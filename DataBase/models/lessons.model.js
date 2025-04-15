import mongoose from "mongoose";


const schema = new mongoose.Schema({
    title: {
        type: String,


    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
    },
    weekId: {
        type:mongoose.Types.ObjectId,
        ref:"week"
    },
    coursId:{
        type:mongoose.Types.ObjectId,
        ref:"cours"
    },
    video:String,
    dateOflesson:Date


}, { timestamps: true ,toJSON:{virtuals:true}})



schema.virtual('qustation',{
    ref:'impoetantQuestion',
    localField:"_id",
    foreignField:'lessonId'
})

schema.pre("findOne",function(){

    this.populate('qustation')
    
})





export const lessonModel = mongoose.model('lesson', schema)



