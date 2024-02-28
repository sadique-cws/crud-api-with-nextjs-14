import mongoose from "mongoose";

const DbConnect  =  () => {
    try{
         mongoose.connect("mongodb://localhost:27017/records")
    }
    catch(e){
        throw new Error("db connection failed")
    }
}

export default DbConnect;