import { NextResponse } from "next/server";
import db from "../../../lib/db";

export async function POST(request) {
  try {
    const {title, slug, description} = await request.json();

    const result = await db.menu.create({
      data: {title, slug,  description}
    })

    
    return NextResponse.json(result);
  }
  catch(error){
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to create a menu'
    }, {
      status: 500
    });
  }
}

export async function GET() {
  try {
    if(!db.menu){
      throw new Error('Menu modle is not defined in db.');
    }

    const menus = await db.menu.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    });
    return NextResponse.json(menus);
  } 
  catch(error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to retriving a menus'
    }, {
      status: 500
    });
  }
}