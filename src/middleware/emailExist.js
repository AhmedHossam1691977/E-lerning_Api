import { AppError } from "../utils/appError.js"
import { userModel } from "../../DataBase/models/user.model.js"



export const chickEmail = async(req,res,next)=>{
    
    const user =await userModel.findOne({email:req.body.email})
    if(user) return next(new AppError("email already exists",401))

    next()
}