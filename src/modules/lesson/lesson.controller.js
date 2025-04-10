import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js";
import { v2 as cloudinaryV2} from "cloudinary"
import { deleteOne } from "../handlers/handlers.js";
import { lessonModel } from "../../../DataBase/models/lessons.model.js";
import { uploadToFTP } from "../../services/ftb.js";
import path from "path";


const addLesson = catchError(async (req, res, next) => {
    const nweLesson = await lessonModel.findOne({ title: req.body.name });

    if (nweLesson) {
        return res.status(400).json({ message: "Lesson already found" });
    } else {
        req.body.slug = slugify(`${req.body.title}`);

        // تعديل اسم الفيديو إذا كان يحتوي على فراغات
        let videoName = req.file.originalname.replace(/\s+/g, "_");  // استبدال الفراغات بـ "_"

        const filePath = req.file.path;
        const remoteFileName = `${Date.now()}-${videoName}`;  // استخدام الاسم المعدل

        await uploadToFTP(filePath, remoteFileName);

        const remoteFilePath = path
            .join(process.env.FTP_BASE_PATH, remoteFileName)
            .replace(/\\/g, "/");

        req.body.video = `https://${remoteFilePath}`;

        const lesson = new lessonModel(req.body);
        lesson.dateOflesson = Date.now() + 10 * 60 * 1000;  // تحديد وقت الدرس
        await lesson.save();

        res.json({ message: "success", lesson: lesson });
    }
});


const getallLesson =catchError(async (req,res,next)=>{
    const lesson = await lessonModel.find()
    res.status(200).json({message:"success",lessonItems:lesson.length,lessones:lesson})
    
})




const getSinglLesson =catchError(async (req,res,next)=>{

    let cours =await lessonModel.findById(req.params.id) 
    !cours && res.status(400).json({message:"cours not found"})
    cours && res.json({message:"success",lesson})

    
})

const updateLesson =catchError(async(req,res,next)=>{ 
    if(req.body.name) req.body.slug=slugify(req.body.name)
    if(req.file){
    
        let videoName = req.file.originalname.replace(/\s+/g, "_");  // استبدال الفراغات بـ "_"

        const filePath = req.file.path;
        const remoteFileName = `${Date.now()}-${videoName}`;  // استخدام الاسم المعدل

        await uploadToFTP(filePath, remoteFileName);

        const remoteFilePath = path
            .join(process.env.FTP_BASE_PATH, remoteFileName)
            .replace(/\\/g, "/");

        req.body.video = `https://${remoteFilePath}`;


    }

    let lesson =await lessonModel.findByIdAndUpdate(req.params.id,req.body,{new:true})  
    lesson.dateOflesson=Date.now() + 10 * 60 * 1000
    !lesson && res.status(400).json({message:"lesson not found"})
    lesson && res.json({message:"success",lesson:lesson})

}

)


const deleteLesson =deleteOne(lessonModel)
export{
    addLesson,
    getallLesson,
    getSinglLesson,
    updateLesson,
    deleteLesson
}