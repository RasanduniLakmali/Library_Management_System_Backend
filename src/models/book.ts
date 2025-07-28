import mongoose from "mongoose";


type Book = {
    title:string,
    author:string,
    isbn:string,
    publicationYear: number,
    category:string,
    status:string,
    publisher:string,
    description:string,
}

const bookSchema = new mongoose.Schema<Book>({

    title:{
        type: String,
        required: true,
        trim: true
    },

    author:{
        type: String,
        required: true,
        trim: true
    },

    isbn:{
        type: String,
        required: true,
        trim: true
    },

    publicationYear:{
        type:Number,
        required: true,

    },

    category:{
        type: String,
        trim: true
    },

    status:{
        type:String,
        required: true,
        trim: true
    },

    publisher:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    }

})


export const BookModel = mongoose.model('Book',bookSchema)
