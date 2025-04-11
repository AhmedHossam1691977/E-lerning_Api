// it is work any time if look error in  code
process.on('uncaughtException',(err)=>{
    console.log("Uncaught Exception Catched!",err)
})

import bodyParser from 'body-parser';

import express  from "express";
import connectionDB from "./DataBase/DBconnection.js";
import bootstrap from "./src/modules/index.routes.js";
import cors from "cors"
import { AppError } from "./src/utils/appError.js";
import { globalError } from "./src/middleware/globalError.js";

import dotenv from "dotenv" //this module use in cover for the secret key
import Stripe from 'stripe';
import { onlineCorsss } from './src/modules/cours/cours.controller.js';
// import { creatOnlineCours } from './src/modules/cours/cours.controller.js';



const app = express()
const port =3000
dotenv.config()
app.use(bodyParser.json());

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = Stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      console.log("success",checkoutSessionCompleted);
      
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});


app.use(cors())
app.use(express.json())








bootstrap(app)
connectionDB()

app.use(globalError)




app.get('', async (req, res) => {
 res.send('Hello World!')
  });






// handeling error if user inter worrning endpoint
app.use('*',(req,res,next)=>{
    
    next(new AppError(`not found endpoint ${req.originalUrl}`,404))
})


app.listen(process.env.PORT ||port , () => {
    console.log(`Server is running on port $${port}` )}
    )

    // handling any thing error out side express
process.on('unhandledRejection',(err)=>{
    console.log(err);
})
