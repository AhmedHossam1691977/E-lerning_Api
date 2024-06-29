import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { catchError } from "../../middleware/catchError.js"
import { userModel } from "../../../DataBase/models/user.model.js"
import { AppError } from "../../utils/appError.js"
import { sendEmail } from "../../services/email/sendEmail.js"







// signup
const signup =catchError( async( req ,res,next )=>{    

        let user =new userModel(req.body)
        await user.save()
        const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)

        return res.json({message:"success",token})
    

})



// signin
const signin =catchError(async ( req ,res,next )=>{

    const user =await userModel.findOne({email:req.body.email})
    if(user  && bcrypt.compareSync(req.body.password ,user.password)){
        const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
        return res.json({message:"success" ,token})
    }
    next(new AppError(`incorect email or password`,401))
})


// changePassword
const changePassword =catchError(async ( req ,res,next )=>{
    const user =await userModel.findById(req.user._id)

    if(user  && bcrypt.compareSync(req.body.password ,user.password))
    {
        let token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
        await userModel.findByIdAndUpdate(req.user._id,{password :req.body.newPassword ,passwordChangedAt:Date.now()})
        return res.json({message:"success" ,token})
    }
    next(new AppError(`incorect password `,401))
})



// Authontcation
const protectedRoutes =catchError(async ( req ,res,next )=>{

    const {token} = req.headers

    
    // token exist or  not
    if(!token) return next( new AppError("Please login first to access this route ",401))


    // verify token
    let decoded = jwt.verify(token , process.env.JWT_KEY)


    //  check if the user still exists / if user chandge password delete old token and create new token
    const user =await userModel.findById(decoded.userId)
    if(!user) return next(new AppError('The User not found', 401))

    if(user.passwordChangedAt){
        let time = parseInt(user.passwordChangedAt.getTime()/1000)
        if(time > decoded.iat) return  next(new AppError('Token is expired , please log in again ',400));

    }
    req.user = user
    next()
})

// authorization for admin
const allwoedTo=(...roles)=>{

    return catchError(async ( req ,res,next )=>{

    if(!roles.includes(req.user.role)) return next(new AppError('You are not allowed to perform this action on this resource' ,403))

    next(); 
    })
}




const forgetPassword =catchError(async ( req ,res,next )=>{
    const user =await userModel.findOne({email:req.body.email});

    if(!user) return next(new AppError('There is no account with provided email address ' ,404))


        const resetToken =Math.floor( Math.random() * 999999);

        user.passwordResetTokenEsxpire =  Date.now() + 10 * 60 * 1000;

        user.passwordResetToken =resetToken 



        await user.save()

    const resetUrl = `${resetToken}`

    const message = `code ${resetUrl}`
    sendEmail   (message, req.body.email)

    res.status(200).json({
        message:"success",
        subject:"pleace chick your email"
    })
})



const VerifyResetCode =catchError(async ( req ,res,next )=>{
    const user =await userModel.findOne({passwordResetToken:req.body.code});


    if(!user)  return next(new AppError('There is no account with provided email address ' ,404))

    res.status(200).json({message:"success"})

    user.resetCode =req.body.code

    await user.save()

})



const resetPassword =catchError(async ( req ,res,next )=>{

    const user =await userModel.findOne({email:req.body.email});

    if(!user) return next(new AppError('There is no account with provided email address ' ,404))

    if(user.resetCode == undefined) return next(new AppError('There is no account with provided email address ' ,404)) 

            user.password = await  req.body.newPassword
            user.confirmPassword=req.body.confirmPassword
            user.passwordResetToken = undefined
            user.passwordResetTokenEsxpire = undefined
            user.passwordChangedAt = Date.now()
            user.resetCode = undefined
            await user.save()
            res.status(200).json({message :"success"})


    

})

export{
    signup,
    signin,
    changePassword,
    protectedRoutes,
    allwoedTo,
    forgetPassword,
    VerifyResetCode,
    resetPassword
}


