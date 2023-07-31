import mongoose from "mongoose";

//Creating a DataBase
mongoose.connect("mongodb://127.0.0.1:27017/firstwebsite",{
}).then(() =>{
console.log("Connection Successful")
}).catch((err) =>{
    console.log(err)
})