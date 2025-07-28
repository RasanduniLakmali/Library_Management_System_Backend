import mongoose from "mongoose";


export type LendingBook = {
    title: string,
    isbn: string,
}


export type Lending = {
    readerName:string,
    books:LendingBook[],
    borrowDate:string,
    dueDate:Date,
    returnDate:Date | null,
    status:string
}


const lendingBookSchema = new mongoose.Schema<LendingBook>({

    title: {
        type: String,
        required: true,
        trim: true,
    },

    isbn: {
        type: String,
        required: true
    }
  },

    {
        _id: false
    }
)

const lendingSchema = new mongoose.Schema<Lending>({

    readerName:{
        type: String,
        required: true,
        trim: true
    },

    books:{
        type:[lendingBookSchema],
        required:true,
    },


    borrowDate:{
        type:String,
        required:[true,"Borrow Date is required"],
    },

    dueDate:{
        type:Date,
        required:[true,"Due Date is required"],
    },

    returnDate: {
        type: Date,
        default: null
    },


    status:{
        type:String,
        required:[true,"Status is required"]
    }


})


export  const LendingModel = mongoose.model("Lending",lendingSchema)