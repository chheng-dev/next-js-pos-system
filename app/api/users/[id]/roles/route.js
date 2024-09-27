import { UserModel } from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const userId = params.id;
    const roles = await UserModel.getRolesByUserId(userId);
    return NextResponse.json(roles);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to retriving a user roles'
    }, {
      status: 500
    });
  }
}

export async function POST(request, { params }) {
  try {
    const userId = params.id;
    const { roleId } = await request.json();

    await UserModel.addRoleToUser(userId, roleId);
    return NextResponse.json({ message: 'Role added to user' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to add roles to user'
    }, {
      status: 500
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const userId = params.id;
    const { roleId } = await request.json();
    await UserModel.removeRoleFromUser(userId, roleId);
    return NextResponse.json({ message: 'Role remove from user' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to remove roles from user'
    }, {
      status: 500
    });
  }
}