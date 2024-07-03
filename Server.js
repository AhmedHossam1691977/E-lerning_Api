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
import cloudinary from "cloudinary"

import dotenv from "dotenv" //this module use in cover for the secret key
const port =3000
const app = express()
dotenv.config()


app.use(cors())


app.use(bodyParser.json());


cloudinary.config({
    cloud_name: 'dng4ptcp4',
    api_key: '357773728746287',
    api_secret: 'S4gWUpw5KOQoPXb-jHuSTkGb_JQ',
  });







app.use(express.json())


// cloud_name: 'ds7tnriwu',
// api_key: '295178979832949',
// api_secret: 'My_TncfvycIIV7-pi8jDR2d7tEY',


bootstrap(app)
connectionDB()

app.use(globalError)




app.get('/', async (req, res) => {
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
