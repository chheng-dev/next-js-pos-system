import { UserModel } from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { full_name, username, email, password, role, is_active, image } = await request.json();

    console.log({ full_name, username, email, password, role, is_active, image });

    const result = await UserModel.createUser(full_name, username, email, password, role, is_active, image);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        error,
        message: 'Failed to create a user'
      },
      {
        status: 500
      }
    );
  }
}
