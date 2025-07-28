import {Router} from "express";
import {
    deleteBook, getTotalBooks,
    saveBook,
    updateBook,
    viewBooks,
    viewBookTitlesWithISBN,
    viewByName
} from "../controller/book.controller";



const bookRouter = Router()

bookRouter.post("/save", saveBook);
bookRouter.get("/get", viewBooks);
bookRouter.get("/by-name/:name", viewByName);       // clearer
bookRouter.put("/update/:id", updateBook);          // no conflict
bookRouter.delete("/delete/:id", deleteBook);
bookRouter.get("/get-books",viewBookTitlesWithISBN)
bookRouter.get("/total-books",getTotalBooks)

export default bookRouter