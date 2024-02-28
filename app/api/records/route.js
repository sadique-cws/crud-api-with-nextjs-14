import DbConnect from "@/app/config/DbConnect";
import Record from "@/app/models/Record";
import { NextRequest, NextResponse } from "next/server";

DbConnect();

export async function GET(req){
    let data = await Record.find();
    return NextResponse.json(data)
}

export async function POST(request){
    const req = await request.json()
    let data = await Record.create(req)
    return NextResponse.json({data, "msg":"data inserted successfully"})
}