import DbConnect from "@/app/config/DbConnect";
import Admin from "@/app/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

DbConnect();

export const POST =  async (req) => {
    let records = await req.json();

    let {username, password} = records;

    let salt = await bcrypt.genSalt(10);

    let hashedPassword = await bcrypt.hash(password, salt);


    let data = new Admin({username, password:hashedPassword});

    try{
        data = await data.save();
        return NextResponse.json({"msg":"account created succesfully"})
    }
    catch(err){
        return NextResponse.json({"msg":err.message});
    }
}