import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required:true,
        minLength: [1, 'too short user name']
    },
    email:{
        type:String,
        trim: true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isBlock:{
        type:Boolean,
        default:false
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    confirmPassword:{
        type:String,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user',
        lowercase:true
    },
    passwordChangedAt:Date,
    addresses: [
        {  
            stret:String,
            phone:String,
            city:String,
        }
        
],
passwordResetToken:String,
resetCode:String,
passwordResetTokenEsxpire:Date ,
corses:[
    {
        type:mongoose.Types.ObjectId,
        ref:"cours"
    }
]

}, { timestamps: true ,toJSON:{virtuals:true} })




// hasing Password in regester
schema.pre('save',function(){
        if(this.password) this.password = bcrypt.hashSync(this.password,8)
        if(this.confirmPassword) this.confirmPassword = bcrypt.hashSync(this.confirmPassword,8)

})

// hasing Password in update
schema.pre('findOneAndUpdate',function(){
    if(this._update.password ) this._update.password= bcrypt.hashSync(this._update.password,8)
})





// virtual populate for All review in the product 
// schema.virtual('cors',{
//     ref:'cours',
//     localField:"_id",
//     foreignField:'coursId'
// })

// schema.pre("findOne",function(){

//     this.populate('cors')
    
// })



export const userModel = mongoose.model('user', schema)



