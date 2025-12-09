import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/user.js';
import courseRouter from './routes/course.js';
import adminRouter from './routes/admin.js';
import dotenv from "dotenv";

dotenv.config();
const app=express();
app.use(express.json());

app.use("/api/v1/user",userRouter)
app.use("/api/v1/course",courseRouter)
app.use("/api/v1/admin",adminRouter)

app.listen(4000,async()=>{
    await mongoose.connect("mongodb+srv://riturajgope1_db_user:0QF6gDU5fngkOF7l@cluster0.4qssj37.mongodb.net/?appName=Cluster0");
    console.log("server connected");
})