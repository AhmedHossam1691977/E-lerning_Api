import express  from "express";
import { validation } from "../../middleware/validation.js";
import { addUser, deleteUser, getAllUser, getSingleUser, updateUser, } from "./user.controller.js";
import { addUserSchemaVal, paramsIdVal, updateUserSchemaVal } from "./user.validation.js";
import { chickEmail } from "../../middleware/emailExist.js";
import { allwoedTo, protectedRoutes } from "../auth/auth.controller.js";


const userRouter = express.Router()


userRouter
    .route('/')
.post(protectedRoutes,validation(addUserSchemaVal),chickEmail,addUser)
.get(getAllUser)



userRouter   
.route('/:id')
.get(validation(paramsIdVal),getSingleUser)
.put(protectedRoutes,allwoedTo('admin'),validation(updateUserSchemaVal),updateUser)
.delete(protectedRoutes,allwoedTo('admin'),validation(paramsIdVal),deleteUser)


export default userRouter