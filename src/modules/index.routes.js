import { globalError } from "../middleware/globalError.js"

import authRouter from "./auth/auth.routes.js"
import coursRouter from "./cours/cours.routes.js"
import lessonRouter from "./lesson/lesson.routes.js"
import questionRouter from "./questtion/questtion.routes.js"
import quezRouter from "./quize/quize.routes.js"
import userRouter from "./user/user.routes.js"
import weekRouter from "./week/week.routes.js"




const bootstrap = (app)=>{

    

    app.use('/api/v1/user',userRouter)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/cours',coursRouter)
    app.use('/api/v1/week',weekRouter)
    app.use('/api/v1/lesson',lessonRouter)
    app.use('/api/v1/question',questionRouter)
    app.use('/api/v1/quze',quezRouter)











    app.use(globalError)
}

export default bootstrap
