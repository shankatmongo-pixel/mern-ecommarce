import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
        products : [{
          
             type: mongoose.Schema.Types.ObjectId,
             ref: 'products',
        }],

        payment: {},
        buyer:{
             type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        status: {
            type: String,
            default: 'not process',
            enum:["not process", "processing","shipped","delivered","cancel"]
        }
},{timestamps:true})
export default mongoose.model("order", orderSchema)