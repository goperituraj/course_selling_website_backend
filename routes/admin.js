import { Router } from "express";
const adminRouter=Router();
import { adminModel, courseModel } from "../db.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
adminRouter.post('/signup',async (req,res)=>{
    const {firstName,lastName,password,email}=req.body;
    await adminModel.create({
        firstName,lastName,password,email
    })
    return res.json({
        message:"You are signed up "
    })
})
adminRouter.post('/signin',async (req,res)=>{
    const {password,email}=req.body;
    const user=await adminModel.findOne({password,email});
    if(user){
        const token=jwt.sign({
            id:user._id,
        },process.env.JWT_ADMIN)

        return res.json({
            token
        })
    }else{
    return res.json({
        message:"Wrong crediantials"
    })
    }
    
})

adminRouter.post("/course",adminMiddleware,async(req,res)=>{
    const adminId=req.userId;
    const {title,description,imageUrl,price}=req.body;
    const course=await courseModel.create({
        title,description,price,imageUrl,creatorId:adminId
    })
    return res.json({
        message:"course created",
        courseId:course._id
    })

})
adminRouter.put("/course",adminMiddleware,async(req,res)=>{
    const adminId=req.userId;
    const {title,description,imageUrl,price,courseId}=req.body;
    const course=await courseModel.findOneAndUpdate({
        creatorId:adminId,
        _id:courseId
    },{
        title,description,price,imageUrl
    })
    return res.json({
        message:"course created successfully",
        courseId:course._id
    })

})

adminRouter.get("/course/bulk",adminMiddleware,async(req,res)=>{
   const adminId=req.userId;
    const {title,description,imageUrl,price}=req.body;
    const course=await courseModel.find({
        creatorId:adminId
    },{
        title,description,price,imageUrl
    })
    return res.json({
        message:"course fetched successfully",
        course
    })
})
export default adminRouter;