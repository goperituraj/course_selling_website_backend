import {Router} from "express"
const courseRouter=Router();
import userMiddleware from "../middlewares/userMiddleware.js"
import { courseModel, purchaseModel } from "../db.js";
courseRouter.post("/purchase",userMiddleware,async (req,res)=>{
    const userId=req.userId;
    const {courseId}=req.body;
    await purchaseModel.create({
        userId,courseId
    })
    return res.json({
        message:"purchased the course",

    })
})
courseRouter.get("/preview",async (req,res)=>{
    
    const courses=await courseModel.find({});
    return res.json({
        message:"all courses fetched",
        courses
    })
})
export default courseRouter;