import express  from "express";
import { validation } from "../../middleware/validation.js";
import { allwoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { uploadSingleFile } from "../../services/fileUplode/fileUplode.js";
import { addWeek, deleteWeek, getSinglWeek, getallWeek, updateWeek } from "./week.controller.js";
import { paramsIdVal, ubdateVal, weekVal } from "./week.validation.js";


const weekRouter = express.Router()


weekRouter
    .route('/')
.post(protectedRoutes,allwoedTo('admin'),uploadSingleFile('image'),validation(weekVal),addWeek)
.get(protectedRoutes,getallWeek)

weekRouter
.route('/:id')
.get(protectedRoutes,validation(paramsIdVal),getSinglWeek)
.put(protectedRoutes,allwoedTo('admin'),validation(ubdateVal),updateWeek)
.delete(protectedRoutes,allwoedTo('admin'),validation(paramsIdVal),deleteWeek)
export default weekRouter