import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js";
import { impoetantQuestionModel } from "../../../DataBase/models/ImportantQuestions.model.js";
import { examModel } from "../../../DataBase/models/exam.model.js";
import { deleteOne } from "../handlers/handlers.js";
import { examScoreModel } from "../../../DataBase/models/ExamScore.js";


const addExam =catchError(async (req,res,next)=>{
    if(req.body.title) req.body.slug=slugify(req.body.title)


        const newExam = new examModel(req.body);
        newExam.createdAt=Date.now() + 10 * 60 * 1000
        await newExam.save();
        res.status(201).json({message:"success",exam:newExam});
    

})


const getAllquze =catchError(async (req,res,next)=>{
    const quze = await examModel.find()
    res.status(200).json({message:"success",quzeItems:quze.length,quzees:quze})
    
})





const getSinglQuze = catchError(async (req, res, next) => {
    // البحث عن الامتحان بالـ ID
    let quze = await examModel.findById(req.params.id).populate('questions.qu');
  
    // التحقق من إذا كان الامتحان موجودًا
    if (!quze) {
      return res.status(400).json({ message: "quze not found" });
    }
  
    // التحقق من إذا كان الطالب قد قدّم هذا الامتحان من قبل
    const examScore = await examScoreModel.findOne({ user: req.user._id, exam: req.params.id });
  
    if (examScore) {
      // إذا كانت النتيجة موجودة، يعني الطالب قد قدّم الامتحان مسبقًا
      return res.status(400).json({ message: "لقد قمت بتقديم هذا الامتحان مسبقًا" });
    }
  
    // إذا لم يكن الطالب قد قدّم الامتحان من قبل، إرجاع الامتحان
    res.json({ message: "success", quze });
  });

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