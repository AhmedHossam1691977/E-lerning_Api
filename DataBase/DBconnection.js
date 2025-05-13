    import mongoose from "mongoose";


    function connectionDB(){ 
        mongoose.set('strictQuery',true)
        mongoose.connect("mongodb+srv://Admin:AhmedHossam1691977@cluster0.8zhjqva.mongodb.net/lesson").then(()=>{
            // mongodb+srv://Admin:AhmedHossam1691977@cluster0.8zhjqva.mongodb.net/E-commerce
        console.log("datatbase conniction....");
    }).catch((err)=>{
        console.log(err);
    })
    }


    export default connectionDB