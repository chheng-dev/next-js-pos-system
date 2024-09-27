import { RoleModel } from "@/models/roleModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ message: 'Role name is required' }, { status: 400 });
    }

    const newRole = await RoleModel.createRole(name);
    return NextResponse.json(newRole);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await RoleModel.getAllRoles();

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to retriving a role'
    }, {
      status: 500
    });
  }
}
