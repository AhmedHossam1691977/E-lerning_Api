import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { impoetantQuestionModel } from "../../../DataBase/models/ImportantQuestions.model.js";


const addquestion = catchError(async (req, res, next) => {
    const { questionText, lessonId } = req.body;

    // تحقق إذا كان هناك سؤال بنفس النص في نفس الدرس
    const existingQuestion = await impoetantQuestionModel.findOne({
        questionText: questionText,
        lessonId: lessonId // نبحث في نفس الدرس فقط
    });

    if (existingQuestion) {
        // إذا كان السؤال موجود في نفس الدرس، نعرض رسالة خطأ
        return res.status(400).json({ message: "this question is already exist in this lesson" });
    }

    // إذا كان السؤال جديدًا أو ينتمي لدرس مختلف، نقوم بإضافته
    req.body.slug = slugify(`${req.body.questionText}`); // إنشاء slug

    // إنشاء السؤال
    const question = new impoetantQuestionModel(req.body);
    question.createdAt = Date.now() + 10 * 60 * 1000; // تحديد الوقت
    await question.save(); // حفظ السؤال

    // إرسال الاستجابة
    res.json({ message: "success", question: question });
});


const getAllQuestion =catchError(async (req,res,next)=>{
    const question = await impoetantQuestionModel.find()
    res.status(200).json({message:"success",questionItems:question.length,questiones:question})
    
})




const getSinglQuestionOfLeson = catchError(async (req, res, next) => {

        const question = await impoetantQuestionModel.find({lessonId:req.params.id});
        
    if (!question) {return res.status(400).json({ message: "question not found" })}

    res.json({ message: "success" ,numberOfQuestion:question.length ,question: question   });
});


const getSinglQuestionOfWeek = catchError(async (req, res, next) => {

    const question = await impoetantQuestionModel.find({weekId:req.params.id});
    
if (!question) {return res.status(400).json({ message: "question not found" })}

res.json({ message: "success" ,numberOfQuestion:question.length ,question: question   });
});



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
    getSinglQuestionOfLeson,
    updateQuestion,
    deleteQuestion,
    getSinglQuestionOfWeek
}