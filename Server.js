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
import { creatOnlineCours } from './src/modules/cours/cours.controller.js';



const app = express()
const port =3000
dotenv.config()
app.use(bodyParser.json());
app.post('/webhook', express.raw({type: 'application/json'}), creatOnlineCours);

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
