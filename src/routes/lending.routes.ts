import {Router} from "express";
import {
    deleteLending,
    fetchAlLendings, getTotalLendingBooks,
    lendBooks,
    updateLending,
    viewByBook,
    viewByReader,
    viewLendingByName
} from "../controller/lending.controller";
import {viewOverdue} from "../controller/overdue.controller";


const lendingRouter = Router()

lendingRouter.post("/lend",lendBooks)
lendingRouter.get("/book/:name",viewByBook)
lendingRouter.get("/reader/:reader",viewByReader)
lendingRouter.put("/:id",updateLending)
lendingRouter.get("/get",fetchAlLendings)
lendingRouter.get("/by-reader/:readerName",viewLendingByName)
lendingRouter.delete("/delete/:id",deleteLending)
lendingRouter.get("/lend-books-total",getTotalLendingBooks)


export default lendingRouter