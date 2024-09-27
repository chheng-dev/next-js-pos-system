import { PermissionModel } from "@/models/permissionModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const permissionId = params.id;
  const permission = await PermissionModel.getPermissionById(permissionId);

  if (!permission) {
    return NextResponse.json({ message: 'Permission not found' }, { status: 404 });
  }

  return NextResponse.json(permission);
}

export async function PUT(request, { params }) {
  const permissionId = params.id;
  const { name } = await request.json();

  const updatePermission = await PermissionModel.updatePermission(permissionId, { name });
  return NextResponse.json(updatePermission);
}

export async function DELETE(request, { params }) {
  const permissionId = params.id;
  await PermissionModel.deletePermission(permissionId);
  return NextResponse.json({ message: 'Permission delete' }, { status: 200 });
}