import express  from "express";
import { getAllExamResults, getExamResult,  submitExam } from "./examScore.controller.js";
import { protectedRoutes } from "../../auth/auth.controller.js";


const examScoreRouter = express.Router()

examScoreRouter
.route('/')
.post(protectedRoutes,submitExam)

examScoreRouter
.route('/:id')
.get(protectedRoutes,getExamResult)

examScoreRouter
.route('/allResult/:id')
.get(protectedRoutes,getAllExamResults)
export default examScoreRouter