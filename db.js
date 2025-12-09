import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    firstName: String,
    lastName: String,
    password: String
});

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    firstName: String,
    lastName: String,
    password: String
});

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courseModel"
    }
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "adminModel"
    }
});

const userModel = mongoose.model("userModel", userSchema);
const adminModel = mongoose.model("adminModel", adminSchema);
const purchaseModel = mongoose.model("purchaseModel", purchaseSchema);
const courseModel = mongoose.model("courseModel", courseSchema);

export {
    userModel,
    adminModel,
    purchaseModel,
    courseModel
};
