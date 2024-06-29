import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js";
import { v2 as cloudinaryV2} from "cloudinary"
import { deleteOne } from "../handlers/handlers.js";
import { lessonModel } from "../../../DataBase/models/lessons.model.js";


const addLesson =catchError(async (req,res,next)=>{

    const nweLesson = await lessonModel.findOne({title:req.body.name})
    if(nweLesson){
        return res.status(400).json({message:"lesson alredy found"})
    }else{
            req.body.slug=slugify(`${req.body.title}`);


    const filePath = req.file.path;
        const result = await cloudinaryV2.uploader.upload(filePath, {
            resource_type: "auto" 
        });

    console.log(result.url);
        req.body.video = result.url

    const lesson = new lessonModel(req.body)
    lesson.dateOflesson=Date.now() + 10 * 60 * 1000
    await  lesson.save()
    res.json({message:"success",lesson:lesson})
    }

})


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
        const filePath = req.file.path;
        const result = await cloudinaryV2.uploader.upload(filePath, {
            resource_type: "auto" 
        });
        req.body.video = result.url 
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