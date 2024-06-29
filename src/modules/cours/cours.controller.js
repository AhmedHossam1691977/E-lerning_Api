import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js";
import cloudinary from "cloudinary"
import { coursesModel } from "../../../DataBase/models/courses.model.js";
import { deleteOne } from "../handlers/handlers.js";


const addCours =catchError(async (req,res,next)=>{

    const nweCours = await coursesModel.findOne({name:req.body.name})
    if(nweCours){
        return res.status(400).json({message:"cours alredy found"})
    }else{
          req.body.slug=slugify(`${req.body.name}`);

    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {});
    req.body.image = result.url 

    
    const cours = new coursesModel(req.body)
    cours.dateOfCours=Date.now() + 10 * 60 * 1000
    await  cours.save()
    res.json({message:"success",cours:cours})
    }

})


const getallCours =catchError(async (req,res,next)=>{
    const cours = await coursesModel.find()
    res.status(200).json({message:"success",coursItems:cours.length,courses:cours})
    
})




const getSinglCoures =catchError(async (req,res,next)=>{

    let cours =await coursesModel.findById(req.params.id) 
    !cours && res.status(400).json({message:"cours not found"})
    cours && res.json({message:"success",cours})

    
})

const updateCours =catchError(async(req,res,next)=>{ 
    if(req.body.name) req.body.slug=slugify(req.body.name);
    if(req.file){
        const filePath = req.file.path;

        const result = await cloudinary.uploader.upload(filePath, {});
        req.body.image = result.url 
    }

    let cours =await coursesModel.findByIdAndUpdate(req.params.id,req.body,{new:true})  
    cours.dateOfCours=Date.now() + 10 * 60 * 1000
    !cours && res.status(400).json({message:"cours not found"})
    cours && res.json({message:"success",cours:cours})

}

)


const deleteCours=deleteOne(coursesModel)
export{
    addCours,
    getallCours,
    getSinglCoures,
    updateCours,
    deleteCours
}