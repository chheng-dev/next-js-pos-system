import { NextResponse } from "next/server";
import db from "../../../lib/db";

export async function POST(request) {
  try {
    const {username, email, password} = await request.json();

    const result = await db.user.create({
      data: {username, email, password}
    })

    
    return NextResponse.json(result);
  }
  catch(error){
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to create a user'
    }, {
      status: 500
    });
  }
}
