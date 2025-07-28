import {Request,Response,NextFunction} from "express";
import {ReaderModel} from "../models/reader";
import {APIError} from "../error/ApiError";



export const saveReader = async (req:Request,res:Response,next:NextFunction) => {

    try{
        const reader = new ReaderModel(req.body);
        await reader.save()
        return res.status(200).json(reader);
    }catch(err){
        next(err);
    }
}

export const viewReaders = async (req:Request,res:Response,next:NextFunction) => {

    try{
        const  readers = await ReaderModel.find()
        return res.status(200).json(readers);

    }catch(err){
        next(err);
    }
}


export const updateReader = async (req:Request,res:Response,next:NextFunction) => {

    try{
        const updatedReader = await ReaderModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,  //return updated customer  -  if -> false - return old customer
                runValidators:true  //run validators before update
            }
        )

        if(!updatedReader){
            throw new APIError(404,"Reader not found")
        }

        res.status(200).json(updatedReader)

    }catch(err:any){
        next(err)
    }
}

export const deleteReader = async (req:Request,res:Response,next:NextFunction) => {

    try{
        const deletedCustomer = await ReaderModel.findByIdAndDelete(req.params.id)

        if(!deletedCustomer){
            throw new APIError(404,"Reader not found")
        }

        res.status(200).json({message:"Reader Successfully deleted!"})

    }catch(err:any){
        next(err)
    }
}

export const viewByReaderName = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.params.name;
    try {
        const readers = await ReaderModel.find({ name: { $regex: name, $options: 'i' } }); // case-insensitive partial match
        res.status(200).json(readers);

    } catch (error) {
        next(error)
    }
};


export const viewReaderNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const readers = await ReaderModel.find({}, { name: 1, _id: 0 });
        const readerNames = readers.map(reader => reader.name); // extract only names
        res.status(200).json(readerNames);
    } catch (err) {
        next(err);
    }
};


export const getEmailByReader = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const readerName = req.params.readerName;

        console.log( "reader : " , readerName);

        const reader = await ReaderModel.findOne({ name: readerName });

        console.log(reader);
        if (!reader) {
            return res.status(404).json({ message: "Reader not found" });
        }

        return res.status(200).json({ email: reader.email });
    } catch (err) {
        next(err);
    }
};

export const getTotalReaders = async (req: Request, res: Response) => {
    try {
        const totalReaders = await ReaderModel.countDocuments();
        res.status(200).json({ total: totalReaders });
    } catch (error) {
        console.error("Error counting readers:", error);
        res.status(500).json({ message: "Failed to get total readers" });
    }
}