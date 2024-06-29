import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { weekModel } from "../../../DataBase/models/week.model.js";


const addWeek =catchError(async (req,res,next)=>{

    const nweWeek = await weekModel.findOne({title:req.body.title})
    if(nweWeek){
        return res.status(400).json({message:"week alredy found"})
    }else{
            req.body.slug=slugify(`${req.body.title}`);

    const week = new weekModel(req.body)
    week.dateOfWeek=Date.now() + 10 * 60 * 1000
    await  week.save()
    res.json({message:"success",week:week})
    }

})


const getallWeek =catchError(async (req,res,next)=>{
    const week = await weekModel.find()
    res.status(200).json({message:"success",weekItems:week.length,weekes:week})
    
})




const getSinglWeek =catchError(async (req,res,next)=>{

    let week =await weekModel.findById(req.params.id) 
    !week && res.status(400).json({message:"week not found"})
    week && res.json({message:"success",week})

    
})

const updateWeek =catchError(async(req,res,next)=>{ 
    if(req.body.name) req.body.slug=slugify(req.body.name);
    

    let week =await weekModel.findByIdAndUpdate(req.params.id,req.body,{new:true})  
    week.dateOfWeek=Date.now() + 10 * 60 * 1000
    !week && res.status(400).json({message:"week not found"})
    week && res.json({message:"success",week:week})

}

)


const deleteWeek =deleteOne(weekModel)
export{
    addWeek,
    getallWeek,
    getSinglWeek,
    updateWeek,
    deleteWeek
}