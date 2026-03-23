import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import colors from 'colors'

import morgan from 'morgan'
import connectdb from './config/db.js'
import authRoute from './routes/authRoute.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'

//configure env



/// Database connection

connectdb()

const app = express();

/// middleware 

app.use(cors({
  origin: "https://mern-ecommarce-1.onrender.com/",
  credentials: true
}))

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product',productRoutes)

app.get('/',(req,res)=>{
   
        res.send("ECOMMERCE APP RUNNING");
    
})


// port 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} Mode on Port ${PORT}`.bgCyan.white);
});