import nodemailer from "nodemailer"
import { emailTampelet } from "./emailTemplate.js";

// import jwt from "jsonwebtoken"



export const sendEmail= async(message , email)=>{


    
const transporter = nodemailer.createTransport({

    service:"gmail",
    auth: {
        user: "ahmedhossam1691977@gmail.com",
        pass: "dhjwitolclovpvlr",
    },
});



const info = await transporter.sendMail({
    from: '"فLahza" <ahmedhossam1691977@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line

    html:emailTampelet(message)


});

// console.log("Message sent: %s", info.messageId);

}