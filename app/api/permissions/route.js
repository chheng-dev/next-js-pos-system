import { PermissionModel } from "@/models/permissionModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ message: 'Permission name is required' }, { status: 400 });
    }

    const newRole = await PermissionModel.createPermission(name);
    return NextResponse.json(newRole);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await PermissionModel.getPermissionsList();

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to retriving a permissions'
    }, {
      status: 500
    });
  }
}
