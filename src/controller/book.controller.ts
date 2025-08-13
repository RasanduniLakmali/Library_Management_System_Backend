import {Request,Response,NextFunction} from "express";
import {BookModel} from "../models/book";
import {APIError} from "../error/ApiError";


export const saveBook = async (req:Request,res:Response,next:NextFunction) => {

    try{
        const book = new BookModel(req.body)
        await book.save()
        return res.status(201).json(book)

    }catch(err:any){
        next(err)
    }
}


export const viewBooks = async (req:Request,res:Response,next:NextFunction) => {

    try{
        const books = await BookModel.find()
        return res.status(200).json(books)
    }catch(err:any){
        next(err)
    }
}


export const updateBook = async (req:Request,res:Response,next:NextFunction) => {

    try{
        console.log(req.body)
        const updatedBook = await BookModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,  //return updated customer  -  if -> false - return old customer
                runValidators:true  //run validators before update
            }
        )

        if(!updatedBook){
            throw new APIError(404,"Book not found")
        }

        res.status(200).json(updatedBook)

    }catch(err:any){
        next(err)
    }

}


export const deleteBook = async (req:Request,res:Response,next:NextFunction) => {

    try{
        const deletedBook = await BookModel.findByIdAndDelete(req.params.id)

        if(!deletedBook){
            throw new APIError(404,"Book not found")
        }

        res.status(200).json({message:"Book Successfully deleted!"})

    }catch(err:any){
        next(err)
    }
}

//meka balanna
export const viewByName = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.params.name;
    try {
        const books = await BookModel.find({ title: { $regex: name, $options: 'i' } });
        res.status(200).json(books);
    } catch (error) {
        next(error)
    }
};


export const viewBookTitlesWithISBN = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await BookModel.find({}, { title: 1, isbn: 1, _id: 0 });
        res.status(200).json(books);
    } catch (err: any) {
        next(err);
    }
};


export const getTotalBooks = async (req: Request, res: Response) => {
    try {
        const totalBooks = await BookModel.countDocuments();
        res.status(200).json({ total: totalBooks });
    } catch (error) {
        console.error("Error counting books:", error);
        res.status(500).json({ message: "Failed to get total books" });
    }
};
