import { NextResponse } from "next/server";
import { UserModel } from "../../../models/userModel";

export async function PATCH(request) {
  try {
    const { id, isActive } = await request.json();
    console.log({ id, isActive });

    if (!id || typeof isActive !== 'boolean') {
      return NextResponse.json(
        { message: 'Invalid request data' },
        { status: 400 }
      );
    }

    const updateUser = await UserModel.updateActiveUser(id, isActive);

    if (!updateUser) {
      return NextResponse.json(
        { message: 'User not found or no changes made.' },
        { status: 404 }
      );
    }

    return NextResponse.json(updateUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message, message: 'Failed to update user status' },
      { status: 500 }
    );
  }
}
