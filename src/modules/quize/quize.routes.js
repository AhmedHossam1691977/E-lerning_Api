import express  from "express";
import { allwoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { addExam, deleteExam, getAllquze, getSinglQuze, updatequze } from "./quize.controller.js";
import { paramsIdVal, quzeVal, ubdateVal } from "./quize.validation.js";



const quezRouter = express.Router()


quezRouter
    .route('/')
.post(protectedRoutes,allwoedTo('admin'),validation(quzeVal),addExam) 
.get(protectedRoutes,getAllquze)

quezRouter
.route('/:id')
.get(protectedRoutes,validation(paramsIdVal),getSinglQuze)
.patch(protectedRoutes,allwoedTo('admin'),validation(ubdateVal),updatequze)
.delete(protectedRoutes,allwoedTo('admin'),validation(paramsIdVal),deleteExam)


export default quezRouter