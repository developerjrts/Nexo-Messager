import mongoose from "mongoose";
import "dotenv/config"

const uri = process.env.MONGOURI;

const ConnectDB = async() => {
    try {
        console.log(`Mongo URI: ${uri}`);
        
        await mongoose.connect(uri);
        console.log("Connected to Database!");
        
    } catch (error) {
        console.log(error);
    }
}

export default ConnectDB;