import mongoose from "mongoose";
import logger from "./logger.js";

export const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        logger.log("Database connected");
    }catch(err){
        logger.log("error connecting Mongodb", err);
    }
}