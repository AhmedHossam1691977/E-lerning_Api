import express  from "express";
// import { validation } from "../../middleware/validation.js";
import { allwoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { uploadSingleFile } from "../../services/fileUplode/fileUplode.js";
import { addLesson, deleteLesson, getSinglLesson, getallLesson, updateLesson } from "./lesson.controller.js";
import { validation } from "../../middleware/validation.js";
import { lessonVal, paramsIdVal, ubdateVal } from "./lesson.validation.js";


const lessonRouter = express.Router()


lessonRouter
    .route('/')
.post(protectedRoutes,allwoedTo('admin'),uploadSingleFile('file'),validation(lessonVal),addLesson)
.get(protectedRoutes,getallLesson)

lessonRouter
.route('/:id')
.get(protectedRoutes,validation(paramsIdVal),getSinglLesson)
.put(protectedRoutes,allwoedTo('admin'),uploadSingleFile('video'),validation(ubdateVal),updateLesson)
.delete(protectedRoutes,allwoedTo('admin'),validation(paramsIdVal),deleteLesson)


export default lessonRouter