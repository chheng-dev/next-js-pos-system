import { NextResponse } from "next/server";
import { getCategories, createCategory } from "@/models/categoryModel";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  }
  catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to retriving a categories'
    }, {
      status: 500
    });
  }
}

export async function POST(request) {
  try {
    const { title, icon, description, menuId } = await request.json();
    const result = await createCategory(title, icon, description, menuId);

    return NextResponse.json(result);
  }
  catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to create a menu'
    }, {
      status: 500
    });
  }
}