import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const dbConnection = async()=>{
    try {
        const connectionDB = await mongoose.connect(`${process.env.MANGODB_URI}/${DB_NAME}`)
        console.log(`DB Connected ${connectionDB.connection.host}` )
        
    } catch (error) {
        console.log("Connection has been FAILED" + error)
        
    }

}

export default dbConnection;