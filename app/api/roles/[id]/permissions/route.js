import { RoleModel } from "@/models/roleModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const roleId = params.id;

    if (!roleId) {
      return NextResponse.json(
        { message: 'Role ID is required' },
        { status: 400 }
      );
    }

    const permissions = await RoleModel.getPermissionsByRoleId(roleId);

    if (!permissions) {
      return NextResponse.json(
        { message: 'No permissions found for this role' },
        { status: 404 }
      );
    }

    return NextResponse.json(permissions, { status: 200 });
  } catch (error) {
    console.error('Error retrieving permissions:', error);
    return NextResponse.json(
      {
        message: 'Failed to retrieve permissions for the role',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const roleId = params.id;
    const { permissionId } = await request.json();
    await RoleModel.addPermissionToRole(roleId, permissionId);
    return NextResponse.json({ message: 'Permission added to role' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to add permissions to role'
    }, {
      status: 500
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const roleId = params.id;
    const { permissionId } = await request.json();
    await RoleModel.removePermissionFromRole(roleId, permissionId);
    return NextResponse.json({ message: 'Permission removed from role' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to remove permissions from role'
    }, {
      status: 500
    });
  }
}