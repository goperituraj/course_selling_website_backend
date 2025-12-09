import {Router} from "express"
import jwt from "jsonwebtoken";
import { courseModel, purchaseModel, userModel } from "../db.js";
import userMiddleware from "../middlewares/userMiddleware.js";

const userRouter=Router();

userRouter.post('/signup',async (req,res)=>{
    const {firstName,lastName,password,email}=req.body;

    await userModel.create({
        firstName,lastName,password,email
    })
    return res.json({
        message:"You are signed up "
    })
})
userRouter.post('/signin',async (req,res)=>{
    const {password,email}=req.body;
    const user=await userModel.findOne({password,email});
    if(user){
        const token=jwt.sign({
            id:user._id,
        },process.env.JWT_USER)

        return res.json({
            token
        })
    }else{
    return res.json({
        message:"Wrong crediantials"
    })
    }
    
})

userRouter.post('/purchases',userMiddleware,async(req,res)=>{
    const userId=req.userId;
    const purchases=await purchaseModel.find({
        userId:userId
    })
    // let purchasedCourseId=[];
    // for(let i=0;i<purchases.length;i++){
    //     purchasedCourseId.push(purchases[i].courseId)

    // }
    const purchasedCourseId = purchases.map((p) => p.courseId);

    const courses=await courseModel.find({
        _id:{
            $in:purchasedCourseId
        }
    })
    return res.json({
        messagae:"all purchases of a particular user",
        courses
    })
})

export default userRouter;