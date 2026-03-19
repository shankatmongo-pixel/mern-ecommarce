import mongoose from "mongoose";
import colors from 'colors'

const connectdb = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Mongodb Database ${connection.connection.host}`.bgGreen.white)
    }catch(error){
            console.log(`Error in Mangodb ${error}`.bgRed.white)
    }
}

export default connectdb;