import {Router} from "express";
import {getOverdueBooksCount, getOverdueReaderBooks, viewOverdue} from "../controller/overdue.controller";



const overdueRouter = Router()

overdueRouter.get("/get",viewOverdue)
overdueRouter.get("/get-overDues",getOverdueReaderBooks)
overdueRouter.get("/overdue-books",getOverdueBooksCount)

export default overdueRouter;