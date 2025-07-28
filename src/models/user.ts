import mongoose from "mongoose";


type User = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
}

const userSchema = new mongoose.Schema<User>({

    firstName:{
        type: String,
        required: true,
        trim: true
    },

    lastName:{
        type: String,
        required: true,
        trim: true
    },

    email:{
        type: String,
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

    password:{
        type: String
    },

    role:{
        type: String,
        required:[true,"Role is required"],
        trim:true,
    }
})

export const UserModel = mongoose.model("User",userSchema)