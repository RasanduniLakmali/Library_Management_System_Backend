import { LendingModel } from "../models/lending";
import { Request, Response, NextFunction } from "express";


export const viewOverdue = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const overDues = await LendingModel.find({
            returnDate: null,
            dueDate: { $lt: today } // Compare against today's Date object
        });

        if (overDues.length === 0) {
            return res.status(404).json({ message: "No overdue books found." });
        }

        return res.status(200).json(overDues);

    } catch (err: any) {
        next(err);
    }
};


export const getOverdueReaderBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const today = new Date();
        const localDate = today.toISOString().split('T')[0];

        const overdues = await LendingModel.find({
            returnDate: null,
            dueDate: { $lt: localDate }
        });

        console.log(JSON.stringify(overdues, null, 2));



        if (overdues.length === 0) {
            return res.status(404).json({ message: "No overdue books found." });
        }

        const result: { readerName: string; bookTitle: string }[] = [];

        // Extract reader names and book titles
        overdues.forEach(lending => {

                lending.books.forEach(book => {
                    result.push({
                        readerName: lending.readerName ?? "Unknown Reader",
                        bookTitle: book.title
                    });
                });

        });

        console.log("result : " ,result);

        return res.status(200).json(result);

    } catch (err: any) {
        next(err);
    }
};


export const getOverdueBooksCount = async (req: Request, res: Response) => {
    try {
        const now = new Date();

        const overdueLendings = await LendingModel.find({
            dueDate: { $lt: now },
            returnDate: null,
        });

        const totalOverdueBooks = overdueLendings.reduce((sum, lending) => sum + lending.books.length, 0);

        res.status(200).json({ total: totalOverdueBooks });
    } catch (err) {
        console.error("Error fetching overdue books:", err);
        res.status(500).json({ message: "Failed to get overdue books count" });
    }
};
