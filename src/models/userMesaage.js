import mongoose from "mongoose";
import validator from "validator";



const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        validator(value) {
            if(!validator.isEmail(value)){
                throw new Error("Invaild EMail ID")
            }
        }
    },
    phone: {
        type:Number,
        required:true,
        minLength:3
    }
})


const User = mongoose.model("UserData", userSchema)

export default User;