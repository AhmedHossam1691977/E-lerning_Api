import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js";
import { impoetantQuestionModel } from "../../../DataBase/models/ImportantQuestions.model.js";
import { examModel } from "../../../DataBase/models/exam.model.js";
import { deleteOne } from "../handlers/handlers.js";


const addExam =catchError(async (req,res,next)=>{
    if(req.body.title) req.body.slug=slugify(req.body.title)


        const newExam = new examModel(req.body);
        newExam.createdAt=Date.now() + 10 * 60 * 1000
        await newExam.save();
        res.status(201).json({message:"success",exam:newExam});
    

})


const getAllquze =catchError(async (req,res,next)=>{
    const quze = await examModel.find().populate('questions.qu')
    res.status(200).json({message:"success",quzeItems:quze.length,quzees:quze})
    
})




const getSinglQuze =catchError(async (req,res,next)=>{

    let quze =await examModel.findById(req.params.id).populate('questions.qu')
    !quze && res.status(400).json({message:"quze not found"})
    quze && res.json({message:"success",quze})

    
})

const updatequze =catchError(async(req,res,next)=>{ 
    if(req.body.name) req.body.slug=slugify(req.body.name)

    let exam =await examModel.findByIdAndUpdate(req.params.id,req.body,{new:true})  
    exam.createdAt=Date.now() + 10 * 60 * 1000
    exam.save()
    !exam && res.status(400).json({message:"exam not found"})
    exam && res.json({message:"success",exam:exam})

}

)


const deleteExam =deleteOne(examModel)
export{
    addExam,
    getAllquze,
    getSinglQuze,
    updatequze,
    deleteExam
}