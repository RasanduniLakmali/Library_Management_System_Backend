import {NextFunction, Request, Response} from "express";
import bcrypt from "bcrypt";
import {UserModel} from "../models/user";
import jwt, {JsonWebTokenError, JwtPayload, TokenExpiredError} from "jsonwebtoken";
import {APIError} from "../error/ApiError";
import {Error} from "mongoose";


const createAccessToken = (userId:string) => {

    return jwt.sign(
        {userId},
        process.env.ACCESS_TOKEN_SECRET!,
        {expiresIn: "2h"}
    )
}


const createRefreshToken = (userId:string) => {

    return jwt.sign(
        {userId},
        process.env.REFRESH_TOKEN_SECRET!,
        {expiresIn: "7d"}
    )
}


export const signUpUser = async(req:Request, res:Response,next:NextFunction) => {

    try{
        const{firstName, lastName, email, password,role} = req.body
        const SALT = 10
        const hashedPassword = await bcrypt.hash(password,SALT)
        const  user = new UserModel({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            role
        })
        await user.save();

        const userWithoutPassword = {
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email
        }
        res.status(200).json(userWithoutPassword);

    }catch(err){

        next(err)
    }

}


export const loginUser = async(req:Request,res:Response,next:NextFunction) =>{

    try{
        const{email,password} = req.body
        const user = await UserModel.findOne({email})

        if(!user){
            throw  new APIError(404,"User not found")
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            throw new APIError(401,"Invalid email or password!")
        }

        const accessToken = createAccessToken(user._id.toString())
        const refreshToken = createRefreshToken(user._id.toString())

        const isProduction =  process.env.NODE_ENV === "production"

        res.cookie("refreshToken",refreshToken, {
            httpOnly: true,
            secure:isProduction,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api/auth/refresh-token"
        })

        const userWithoutPassword = {
            _id:user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accessToken
        }

        res.status(200).json(userWithoutPassword);

    }catch(err){
        next(err)
    }
}


export const refreshToken = async (req:Request, res:Response,next:NextFunction) => {


    try{
        const token = req.cookies?.refreshToken

        if(!token){
            throw new APIError(401,"Refresh token missing")
        }

        jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET!,

            async (
                error: Error | null,
                decoded: string | JwtPayload | undefined
            ) =>{

                if(error){
                    if(error instanceof TokenExpiredError){
                        return next(new APIError(401,"Refresh token expired"))
                    }else if(error instanceof JsonWebTokenError){
                        return next(new APIError(401,"Invalid refresh token"))
                    }else{
                        return next(new APIError(401,"Error verifying refresh token"))
                    }
                }
                if(!decoded || typeof decoded === "string"){
                    return next(new APIError(401,"Refresh token payload invalid"))
                }

                const userId = decoded.userId as string
                const user = await UserModel.findById(userId)

                if(!user){
                    return  next (new APIError(401,"User not found"))
                }

                const newAccessToken = createAccessToken(user._id.toString())
                res.status(200).json({accessToken:newAccessToken})
            }
        )


    }catch(err){
        next(err)
    }

}


export const getProfile = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new APIError(401, "Authorization token missing!");
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;

        const userId = decoded.userId;

        const user = await UserModel.findById(userId).select("-password");

        if (!user) {
            throw new APIError(404, "User not found");
        }

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }

};


export const updateUser = async (req: Request, res: Response, next: NextFunction) => {

     try{
         const userId = req.body._id;
         const { firstName, lastName, email, role } = req.body;

         const updatedUser = await UserModel.findByIdAndUpdate(
             userId,
             { firstName, lastName, email, role },
             { new: true }
         );

         res.json(updatedUser);

     }catch(err){
         next(err);
     }
}


export const changePassword = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId; // Comes from the token
        const { currentPassword, newPassword } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Current password incorrect" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};




export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: string };
        req.body.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
