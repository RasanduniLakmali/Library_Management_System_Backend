import nodemailer from 'nodemailer';
import {LendingBook} from "../models/lending";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rasandunilakmali26@gmail.com',
        pass: 'iljg ylku tfqp lnhs' // Make sure to use a secure method to store this
    }
});

/**
 * Generate plain text content for overdue notification
 */
const generateEmailContent = (
    readerName: string,
    books: { title: string, dueDate: string }[]
): string => {
    const bookList = books.map(book => {
        return `• ${book.title} (Due: ${book.dueDate})`;
    }).join('\n');

    return `
Dear ${readerName},

The following book(s) are overdue. Please return them as soon as possible:

${bookList}

Thank you,
Library Team
  `;
};

/**
 * Send overdue notification email (HTML + plain text)
 */
export const sendOverdueEmail = async (
    to: string,
    readerName: string,
    books: { title: string, dueDate: string }[]
) => {
    const bookListHTML = books.map(book => `<li>${book.title} (Due: ${book.dueDate})</li>`).join('');
    const plainText = generateEmailContent(readerName, books);

    const mailOptions = {
        from: '"Library Notification" <yourlibraryemail@gmail.com>',
        to,
        subject: 'Overdue Book Reminder',
        text: plainText,
        html: `
            <p>Dear ${readerName},</p>
            <p>The following book(s) are overdue. Please return them as soon as possible:</p>
            <ul>${bookListHTML}</ul>
            <p>Thank you,<br/>Library Team</p>
        `
    };

    await transporter.sendMail(mailOptions);
};