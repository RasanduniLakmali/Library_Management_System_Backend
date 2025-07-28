import express ,{Request,Response} from "express"
import rootRouter from "./routes";
import {errorHandler} from "./middlewares/errorHandler";
import {connectDB} from "./db/mongo";
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()

const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
    methods:"GET,POST,PUT,PATCH,DELETE,OPTIONS",
    allowedHeader:["Content-Type","Authorization"],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT

app.use("/api",rootRouter)
app.use(errorHandler)


app.get("/" ,(req: Request,res:Response) =>{
    res.send("Hello World!")
})

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
})