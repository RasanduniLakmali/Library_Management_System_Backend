
import mongoose from "mongoose";

type Reader = {
    readerId: string;
    name:string,
    email:string,
    phone:string,
    address:string,
    membershipDate:string,
    status:string,
}

const readerSchema = new mongoose.Schema<Reader>({

    readerId: {
        type: String,
        required: [true,"Reader ID is required"],
        trim: true,

    },

    name:{
        type:String,
        minlength:[2,"Name must be at least 2 characters long"],
        required:[true, "Name is required"],
        trim:true,
    },

    email:{
        type:String,
        unique:[true,"User already exists"],
        required:[true, "Email is required"],
        index:true,
        trim:true,
        lowercase:true,
        match:[
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please use a valid email address"
        ]
    },

    phone:{
        type:String,
        minlength: [10,"Phone must be at least 10 characters long"],
        required:[true,"Phone is required"],
    },
    address:{
        type: String,
        minlength:[5, "Address must be at least 5 characters long"],
        required:[true,"Address is required"],
    },

    membershipDate:{
        type:String,
        required:[true,"Date is required"],

    },
    status:{
        type:String,
        required:[true,"Status is required"],

    }
})


export const ReaderModel = mongoose.model("Reader", readerSchema);