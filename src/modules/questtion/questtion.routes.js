import express  from "express";
import { allwoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { uploadSingleFile } from "../../services/fileUplode/fileUplode.js";
import { addquestion, deleteQuestion, getAllQuestion, getSinglQuestionOfLeson, getSinglQuestionOfWeek, updateQuestion } from "./questtion.controller.js";
import { validation } from "../../middleware/validation.js";
import { paramsIdVal, questionVal, ubdateVal } from "./questtion.validation.js";



const questionRouter = express.Router()


questionRouter
    .route('/')
.post(protectedRoutes,allwoedTo('admin'),validation(questionVal),addquestion) 
.get(protectedRoutes,getAllQuestion)

questionRouter
.route('/:id')
.get(protectedRoutes,validation(paramsIdVal),getSinglQuestionOfLeson)
.put(protectedRoutes,allwoedTo('admin'),validation(ubdateVal),updateQuestion)
.delete(protectedRoutes,allwoedTo('admin'),validation(paramsIdVal),deleteQuestion)

questionRouter
.route('/week/:id')
.get(protectedRoutes,validation(paramsIdVal),getSinglQuestionOfWeek)

questionRouter
.route('/course/:id')
.get(protectedRoutes,validation(paramsIdVal),getSinglQuestionOfWeek)

export default questionRouter