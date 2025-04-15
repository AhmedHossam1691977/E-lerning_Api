import express  from "express";
import { validation } from "../../middleware/validation.js";
import { allwoedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addCours, createChickOutSession, deleteCours, getMyCourses, getSinglCoures, getallCours, updateCours } from "./cours.controller.js";
import { uploadSingleFile } from "../../services/fileUplode/fileUplode.js";
import { coursVal, paramsIdVal, ubdateVal } from "./cours.validation.js";


const coursRouter = express.Router()


coursRouter
    .route('/')
.post(protectedRoutes,allwoedTo('admin'),uploadSingleFile('image'),addCours)
.get(protectedRoutes,getallCours)


coursRouter
.route('/getMyCourses')
.get(protectedRoutes,allwoedTo('admin','user'),getMyCourses)


coursRouter
.route('/:id')
.get(protectedRoutes,validation(paramsIdVal),getSinglCoures)
.put(protectedRoutes,allwoedTo('admin'),uploadSingleFile('image'),validation(ubdateVal),updateCours)
.delete(protectedRoutes,allwoedTo('admin'),validation(paramsIdVal),deleteCours)


coursRouter
.route('/ChickOut/:id')
.post(protectedRoutes,allwoedTo('user','admin'),validation(paramsIdVal),createChickOutSession)







export default coursRouter