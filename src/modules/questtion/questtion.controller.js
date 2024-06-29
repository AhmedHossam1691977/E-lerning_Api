import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { impoetantQuestionModel } from "../../../DataBase/models/ImportantQuestions.model.js";


const addquestion =catchError(async (req,res,next)=>{

    const nweQuastion = await impoetantQuestionModel.findOne({questionText:req.body.questionText})
    if(nweQuastion){
        return res.status(400).json({message:"quastion alredy found"})
    }else{
        req.body.slug=slugify(`${req.body.questionText}`);

        const question = new impoetantQuestionModel(req.body)
        question.createdAt=Date.now() + 10 * 60 * 1000
        await  question.save()
        res.json({message:"success",question:question})
    }

})


const getAllQuestion =catchError(async (req,res,next)=>{
    const question = await impoetantQuestionModel.find()
    res.status(200).json({message:"success",questionItems:question.length,questiones:question})
    
})




const getSinglQuestion =catchError(async (req,res,next)=>{

    let question =await impoetantQuestionModel.findById(req.params.id) 
    !question && res.status(400).json({message:"question not found"})
    question && res.json({message:"success",question})

    
})

const updateQuestion =catchError(async(req,res,next)=>{ 
    if(req.body.name) req.body.slug=slugify(req.body.name)

    let question =await impoetantQuestionModel.findByIdAndUpdate(req.params.id,req.body,{new:true})  
    question.createdAt=Date.now() + 10 * 60 * 1000
    !question && res.status(400).json({message:"question not found"})
    question && res.json({message:"success",question:question})

}

)


const deleteQuestion =deleteOne(impoetantQuestionModel)
export{
    addquestion,
    getAllQuestion,
    getSinglQuestion,
    updateQuestion,
    deleteQuestion
}