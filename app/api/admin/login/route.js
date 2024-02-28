import Admin from "@/app/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import DbConnect from "@/app/config/DbConnect";


DbConnect();
export const POST = async (req) => {
    let records = await req.json();

    let {username, password} = records;

    try{
        const admin = await Admin.findOne({username});

        if(!admin){
            return NextResponse.json({"msg": "invalid username "}, {status:400})
        }

        const validPassword = await bcrypt.compare(password, admin.password);

        if(!validPassword){
            return NextResponse.json({"msg": "incorrect username or password"}, {status:400})
        }

        // creating token 
        let tokenData = {
            id: admin._id, 
            username: admin.username
        }

        let token = JWT.sign(tokenData, "mynameis", {expiresIn:"1h"})

        const response =  NextResponse.json({"msg":"Login Successfully", success:true})
       
        response.cookies.set("token", token, {
            httpOnly:true
        })
        console.log("test")

        return response;
    }
    catch(error){
        return NextResponse.json({"error": error.message})
    }
}