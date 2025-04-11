import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js";
import cloudinary from "cloudinary"
import { coursesModel } from "../../../DataBase/models/courses.model.js";
import { deleteOne } from "../handlers/handlers.js";
import { uploadToFTP } from "../../services/ftb.js";
import path from "path";
import Stripe from 'stripe';
import { userModel } from "../../../DataBase/models/user.model.js";
const stripe = new Stripe('sk_test_51P2lleF7DMF7Cu0m6dMOzdYJLVmia81ABlZ06E7jwbGmLI6m2Vc5Y0fCfbxu2Uy6wsVLubWjxPrxt0BVQ03msi5w00XU3t8UUD');

const addCours = catchError(async (req, res, next) => {
    const existingCours = await coursesModel.findOne({ name: req.body.name });
    if (existingCours) {
      return res.status(400).json({ message: "cours already found" });
    }
  
    req.body.slug = slugify(`${req.body.name}`);
  
    // Check if file exists and clean file name
    if (req.file && req.file.originalname) {
      // Replace spaces and unsafe characters with hyphens
      const cleanFileName = `${Date.now()}-${req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '-')}`;
      
      const filePath = req.file.path;
      console.log(filePath);
  
      await uploadToFTP(filePath, cleanFileName);
  
      const remoteFilePath = path
        .join(process.env.FTP_BASE_PATH, cleanFileName)
        .replace(/\\/g, "/");
  
      // Add full URL to the image
      req.body.image = `https://${remoteFilePath}`;
    } else {
      // Set a default image or placeholder if no image was uploaded
      req.body.image = "https://yourdomain.com/default-image.png";
    }
  
    const cours = new coursesModel(req.body);
    cours.dateOfCours = Date.now() + 10 * 60 * 1000;
    await cours.save();
  
    res.json({ message: "success", cours });
  });
  

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
        console.log(filePath);

        const remoteFileName = `${Date.now()}-${req.file.originalname}`;
        await uploadToFTP(filePath, remoteFileName);
        const remoteFilePath = path
        .join(process.env.FTP_BASE_PATH, remoteFileName)
        .replace(/\\/g, "/");
      req.body.image = `https://${remoteFilePath}`;
    
    }

    let cours =await coursesModel.findByIdAndUpdate(req.params.id,req.body,{new:true})  
    cours.dateOfCours=Date.now() + 10 * 60 * 1000
    !cours && res.status(400).json({message:"cours not found"})
    cours && res.json({message:"success",cours:cours})

}

)

const deleteCours=deleteOne(coursesModel)


const createChickOutSession = catchError(async (req, res, next) => {
    const cours = await coursesModel.findById(req.params.id);
    if (!cours) return res.status(400).json({ message: "cours not found" });
  
    let session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'EGP',
          unit_amount: cours.price * 100,
          product_data: {
            name: cours.name,
          },
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `https://final-pro-api-j1v7.onrender.com/api/v1/cours/${cours._id}`,
      cancel_url: `https://final-pro-api-j1v7.onrender.com/api/v1/cours`,
      customer_email: req.user.email,
      client_reference_id: cours._id.toString(),
      metadata: {
        coursId: cours._id.toString(),
        userId: req.user._id.toString(),
      },
    });
  
    res.status(200).json({ message: "success", url: session });

  });
  


  const onlineCorsss = catchError(async(req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed.', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
  
      const coursId = session.metadata.coursId;
      const userId = session.metadata.userId;
  
      // سجل عملية الشراء هنا
      await EnrollModel.create({
        user: userId,
        course: coursId,
        paymentStatus: 'paid',
        stripeSessionId: session.id,
      });
  
      console.log(`✅ User ${userId} paid for course ${coursId}`);
    }
  
    res.status(200).json({ received: true });

      })



export{
    addCours,
    getallCours,
    getSinglCoures,
    updateCours,
    deleteCours,
    createChickOutSession,
    onlineCorsss
}


// async function corsss(e) {

//     const cours = await coursesModel.findById(e.client_reference_id);
//     if (!cours) return res.status(400).json({ message: "cours not found" });
//     cours.payPy = e.customer_email;
    
//    cours.save()

//     const user = await userModel.findById(e.metadata.userId);
//     if (!user) return res.status(400).json({ message: "user not found" });

//     user.corses = e.client_reference_id

//     user.save()

//     return next()
// }