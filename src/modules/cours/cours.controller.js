import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js";
import cloudinary from "cloudinary"
import { coursesModel } from "../../../DataBase/models/courses.model.js";
import { deleteOne } from "../handlers/handlers.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51P2lleF7DMF7Cu0m6dMOzdYJLVmia81ABlZ06E7jwbGmLI6m2Vc5Y0fCfbxu2Uy6wsVLubWjxPrxt0BVQ03msi5w00XU3t8UUD');


const addCours =catchError(async (req,res,next)=>{

    const nweCours = await coursesModel.findOne({name:req.body.name})
    if(nweCours){
        return res.status(400).json({message:"cours alredy found"})
    }else{
          req.body.slug=slugify(`${req.body.name}`);

    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {});
    req.body.image = result.url 
    // console.log(result.url);
    
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





const createChickOutSession =catchError(async(req,res,next)=>{ 

    let corse = await coursesModel.findById(req.params.id)
    if(!corse) {return next(new AppError("corse not found"),404)};

    // total price
    let totalOrderPrice = corse.price 


    let session = await stripe.checkout.sessions.create({

        line_items:[
            {
                    price_data:{
                        currency:'EGP',
                        unit_amount: totalOrderPrice * 100,
                        product_data:{
                            name:req.user.name ,
                        }
                    },
                    quantity:1,
            }
        ],
        mode:'payment',
        success_url:'https://final-pro-api-j1v7.onrender.com/api/v1/product',
        cancel_url:'https://final-pro-api-j1v7.onrender.com/api/v1/order',
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.userAddress,
    })

    res.json( {message:'success', session:session} )


}

)

export{
    addCours,
    getallCours,
    getSinglCoures,
    updateCours,
    deleteCours,
    createChickOutSession,
    // createOnlaineOrder
}



