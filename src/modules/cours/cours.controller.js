import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js";
import cloudinary from "cloudinary"
import { coursesModel } from "../../../DataBase/models/courses.model.js";
import { deleteOne } from "../handlers/handlers.js";
import { uploadToFTP } from "../../services/ftb.js";
import path from "path";
import Stripe from 'stripe';
import { userModel } from "../../../DataBase/models/user.model.js";
import { AppError } from "../../utils/appError.js";
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

  console.log(cours._id);
  
    const user = await userModel.findById(req.user._id);
    const hasPurchased = user.corses.includes(cours._id);

    if (!hasPurchased) {
        return res.status(403).json({ message: "You are not authorized to view this course" });
    }



    cours && res.json({message:"success",cours})

    
})


const getMyCourses = catchError(async (req, res, next) => {
  const user = req.user
console.log(user);

  // نجيب الكورسات اللي المستخدم شاريها
  const courses = await coursesModel.find({
      _id: { $in: user.corses }
  });

  res.json({ message: "success", myCourses:courses });
});




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
  


  const onlineCorsss = catchError((req, res) => {
    const sig = req.headers['stripe-signature'];
  
    let event;
  
    try {
      event = Stripe.webhooks.constructEvent(
        req.body, 
        sig, 
        "whsec_nsttgrnDILHoYGv069mh7iXf20ZlFwaU"
      );
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the event
    if(event.type ==='checkout.session.completed'){
        corsss(event.data.object)
    }else{
        console.log(`Unhandled event type ${event.type}`);
    }
  
    res.json( { message:"succes" ,event:event.data.object ,eventType:event.type});
  
  })





export{
    addCours,
    getallCours,
    getSinglCoures,
    updateCours,
    deleteCours,
    createChickOutSession,
    onlineCorsss,
    getMyCourses
}

async function corsss(e) {
  try {
      // 1. التحقق من وجود الكورس أولاً
      const cours = await coursesModel.findById(e.metadata.coursId);
      if (!cours) {
          return res.status(400).json({ message: "Course not found" });
      }

      // 2. التحقق من وجود المستخدم أولاً
      const user = await userModel.findById(e.metadata.userId);
      if (!user) {
          return res.status(400).json({ message: "User not found" });
      }

      // 3. التحقق إذا كان المستخدم قد اشترى الكورس مسبقاً
      const alreadyPurchased = cours.payPy.includes(e.metadata.userId);
      if (alreadyPurchased) {
          return res.status(400).json({ message: "User already purchased this course" });
      }

      // 4. تحديث الكورس بإضافة المشتري الجديد (بدون تكرار)
      const updatedCourse = await coursesModel.findByIdAndUpdate(
          e.metadata.coursId,
          {
              $addToSet: { payPy: e.metadata.userId }, // يضيف المستخدم فقط إذا لم يكن موجوداً
              $set: { 
                  isPay: true, 
                  paidAt: Date.now() 
              },
              $inc: { numberOfPayed: 1 }
          },
          { new: true }
      );

      // 5. تحديث المستخدم بإضافة الكورس (بدون تكرار)
      const updatedUser = await userModel.findByIdAndUpdate(
          e.metadata.userId,
          {
              $addToSet: { corses: e.client_reference_id }
          },
          { new: true }
      );

      // 6. إرجاع النتيجة النهائية
      return res.status(200).json({ 
          message: "تم تسجيل الشراء بنجاح",
          course: updatedCourse,
          user: updatedUser
      });

  } catch (error) {
      console.error("Error in corsss:", error);
      return next(new AppError('حدث خطأ أثناء معالجة الشراء', 500));
  }
}