import express  from "express";
import { allwoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { uploadSingleFile } from "../../services/fileUplode/fileUplode.js";
import { addquestion, deleteQuestion, getAllQuestion, getSinglQuestion, updateQuestion } from "./questtion.controller.js";
import { validation } from "../../middleware/validation.js";
import { paramsIdVal, questionVal, ubdateVal } from "./questtion.validation.js";



const questionRouter = express.Router()


questionRouter
    .route('/')
.post(protectedRoutes,allwoedTo('admin'),validation(questionVal),addquestion) 
.get(protectedRoutes,getAllQuestion)

questionRouter
.route('/:id')
.get(protectedRoutes,validation(paramsIdVal),getSinglQuestion)
.put(protectedRoutes,allwoedTo('admin'),validation(ubdateVal),updateQuestion)
.delete(protectedRoutes,allwoedTo('admin'),validation(paramsIdVal),deleteQuestion)


export default questionRouter