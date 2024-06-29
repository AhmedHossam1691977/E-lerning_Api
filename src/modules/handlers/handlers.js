import { catchError } from "../../middleware/catchError.js"

export function deleteOne(model){

    return catchError(async(req,res,next)=>{ 
        let document =await model.findByIdAndDelete(req.params.id,{new:true})  
        !document && res.status(400).json({message:"document not found"})
        if (document){
            const items =await model.find()
            console.log(items.length);
            return res.status(200).json({message:"success",length:items.length,items:items})
        } 
    })

}