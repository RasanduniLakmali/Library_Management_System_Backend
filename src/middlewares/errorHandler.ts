import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import {APIError} from "../error/ApiError";

export const errorHandler = function (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof mongoose.Error) {
        return res.status(400).json({ message: error.message });
    }

    if (error instanceof APIError) {
        return res.status(error.status).json({ message: error.message });
    }

    // fallback for unexpected errors
    return res.status(500).json({ message: 'Internal server error' });
};
