import { NextResponse } from "next/server";
import db from "../../../lib/db";

export async function POST(request) {
  try {
    const {categoryName, icon, description, selectedMenuId} = await request.json();

    const result = await db.category.create({
      data: {
        title: categoryName, 
        menuId: selectedMenuId,
        icon,
        description
      }
    })
    
    return NextResponse.json(result);
  }
  catch(error){
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to create a category'
    }, {
      status: 500
    });
  }
}

export async function GET() {
  try {
    if(!db.category){
      throw new Error('Category modle is not defined in db.');
    }

    const categories = await db.category.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    });
    return NextResponse.json(categories);
  } 
  catch(error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to retriving a categories'
    }, {
      status: 500
    });
  }
}