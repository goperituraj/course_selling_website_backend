import jwt from "jsonwebtoken";

const adminMiddleware=async (req,res)=>{
    const token=req.headers.token;
    const decoded=jwt.verify(token,process.env.JWT_ADMIN);  

    if(decoded){
        req.userId=decoded.id;
        next();
    }else{
        return res.json({
            message:"you are not signed in"
        })
    }
}

export default adminMiddleware;