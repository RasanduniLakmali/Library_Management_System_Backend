import {Request,Response,NextFunction} from "express";
import {LendingModel} from "../models/lending";
import {ReaderModel} from "../models/reader";
import {APIError} from "../error/ApiError";


export const lendBooks = async (req: Request, res: Response, next: NextFunction) => {


    try {

        const { readerName } = req.body;

        console.log(readerName);

        const existingReader = await ReaderModel.findOne({ name:readerName });

        console.log(existingReader);

        if (!existingReader) {
            return res.status(400).json({ message: "Reader is not registered." });
        }


        const lending = new LendingModel(req.body);
        await lending.save();

        return res.status(200).json(lending);
    } catch (err: any) {
        next(err);
    }


};


export const viewByBook = async (req: Request, res: Response, next: NextFunction) => {

    try{

        const bookName = req.params.name
        const lendingHistory = await LendingModel.findOne({book:bookName})

        if (!lendingHistory) {
            return res.status(404).json({ message: "No lending history found for this book." });
        }

        return res.status(200).json(lendingHistory);

    }catch(err:any){
        next(err);
    }
}


export const viewByReader = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const reader = req.params.reader
        const lendingHistory = await LendingModel.findOne({readerName:reader})

        if (!lendingHistory) {
            return res.status(404).json({ message: "No lending history found for this reader." });
        }

        return res.status(200).json(lendingHistory);
    }catch(err:any){
        next(err);
    }
}


export const updateLending = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const updatedLending = await LendingModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        )

        if (!updatedLending) {
            throw new APIError(404,"Lending history not found");
        }

        res.status(200).json(updatedLending);

    }catch(err:any){
        next(err);
    }
}

export const fetchAlLendings = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const lendings = await LendingModel.find()
        return res.status(200).json(lendings);
    }catch(err:any){
        next(err);
    }

}

export const viewLendingByName = async (req: Request, res: Response, next: NextFunction) => {

    const readerName = req.params.readerName;
    try {
        const readers = await LendingModel.find({ readerName: { $regex: readerName, $options: 'i' } }); // case-insensitive partial match
        res.status(200).json(readers);

    } catch (error) {
        next(error)
    }
};


export const deleteLending = async (req:Request,res:Response,next:NextFunction) => {

    try{
        const deletedLending = await LendingModel.findByIdAndDelete(req.params.id)

        if(!deletedLending){
            throw new APIError(404,"Book Lending not found")
        }

        res.status(200).json({message:"Book lending Successfully deleted!"})

    }catch(err:any){
        next(err)
    }
}


export const getTotalLendingBooks = async (req: Request, res: Response) => {
    try {
        const lendings = await LendingModel.find();

        const totalBooksLent = lendings.reduce((sum, lending) => sum + lending.books.length, 0);

        res.status(200).json({ total: totalBooksLent });
    } catch (err) {
        console.error("Error fetching total lent books:", err);
        res.status(500).json({ message: "Failed to get total lending books" });
    }
};

