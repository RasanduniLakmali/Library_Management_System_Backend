import { Request, Response, NextFunction } from 'express';
import { sendOverdueEmail } from '../utils/emailSender'; // adjust path as needed

export const sendNotification = async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, books } = req.body;

    if (!email || !name || !Array.isArray(books)) {
        return res.status(400).json({ message: 'Missing or invalid request data' });
    }

    try {
        await sendOverdueEmail(email, name, books);
        res.status(200).json({ message: 'Notification sent!' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ message: 'Failed to send notification' });
    }
};
