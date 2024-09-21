import { NextResponse } from "next/server";
import { getListMenus, createMenu } from "@/models/menuModel";


export async function GET() {
  try {
    const menus = await getListMenus();
    return NextResponse.json(menus);
  }
  catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to retriving a menus'
    }, {
      status: 500
    });
  }
}

export async function POST(request) {
  try {
    const { title, slug, description } = await request.json();
    const result = await createMenu(title, slug, description);

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