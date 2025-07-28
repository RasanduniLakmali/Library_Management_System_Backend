import {Router} from "express";
import {
    deleteReader, getEmailByReader, getTotalReaders,
    saveReader,
    updateReader,
    viewByReaderName, viewReaderNames,
    viewReaders
} from "../controller/reader.controller";


const readerRouter = Router()

readerRouter.post("/save",saveReader)
readerRouter.get("/get",viewReaders)
readerRouter.put("/:id",updateReader)
readerRouter.delete("/:id",deleteReader)
readerRouter.get("/by-name/:name",viewByReaderName)
readerRouter.get("/get-names",viewReaderNames)
readerRouter.get("/get-email/:readerName",getEmailByReader)
readerRouter.get("/total-readers",getTotalReaders)

export default readerRouter