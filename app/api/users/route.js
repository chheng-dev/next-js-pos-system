import { NextResponse } from "next/server";
import { UserModel } from "@/models/userModel";

export async function GET() {
  try {
    const users = await UserModel.getUserList();
    return NextResponse.json(users);
  }
  catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to retriving a users'
    }, {
      status: 500
    });
  }
}

export async function POST(request) {
  try {
    const { full_name, username, email, password, role, is_active = true, image } = await request.json();
    const newUser = await UserModel.createUser(full_name, username, email, password, role, is_active, image);

    return NextResponse.json(newUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to create a user'
    }, {
      status: 500
    });
  }
}
