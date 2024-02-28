

import mongoose from "mongoose";


const adminScheme = new mongoose.Schema({
    username:{type:String, required:true, unique: true},
    password:{type:String, required:true}
}, {timestamps:true})


export default mongoose.models.Admin || mongoose.model("Admin", adminScheme)


