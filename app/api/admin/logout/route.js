import Admin from "@/app/models/Admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import DbConnect from "@/app/config/DbConnect";


DbConnect();
export const POST = async (req) => {
    let response = NextResponse.json({"msg":"logout"})

    response.cookies.delete("token")

    return response;

}