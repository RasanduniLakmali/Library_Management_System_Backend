import {Router} from "express";
import authRouter from "./auth.routes";
import readerRouter from "./reader.routes";
import bookRouter from "./book.routes";
import lendingRouter from "./lending.routes";
import overdueRouter from "./overdue.routes";
import notificationRouter from "./notification.routes";


const rootRouter = Router()

rootRouter.use("/auth",authRouter)
rootRouter.use("/reader",readerRouter)
rootRouter.use("/book",bookRouter)
rootRouter.use("/lending",lendingRouter)
rootRouter.use("/overdue",overdueRouter)
rootRouter.use("/notification",notificationRouter)

export default rootRouter;