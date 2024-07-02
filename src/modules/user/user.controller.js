
import { catchError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { userModel } from "../../../DataBase/models/user.model.js";


const addUser = catchError(async (req,res,next)=>{

    const user = new userModel(req.body)
    await  user.save()
    res.json({message:"success",user:{name:user.name,email:user.email}})

})


const getAllUser =catchError(async(req,res,next)=>{ 

    let apiFeatures=new ApiFeatures(userModel.find(),req.query)
    .feildes().search().filter().sort().pagination()
    
    // exequte query
    let user = await apiFeatures.mongooseQuery
    res.json({message:"success",page:apiFeatures.pageNumber,user:user})

    
}
)

const getSingleUser =catchError(
    async(req,res,next)=>{ 
        let user =await userModel.findById(req.params.id).populate("corses") 
        !user && res.status(400).json({message:"user not found"})
        user && res.json({message:"success",user:user})
    
    }
)

const updateUser =catchError(async(req,res,next)=>{ 
    
    let user =await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})  
    !user && res.status(400).json({message:"user not found"})
    user && res.json({message:"success",user:user})


}
)


const deleteUser =deleteOne(userModel)

export{
    addUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}