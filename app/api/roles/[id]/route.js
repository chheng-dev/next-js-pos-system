import { RoleModel } from "@/models/roleModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const roleId = params.id;
  const role = await RoleModel.getRoleById(roleId);

  if (!role) {
    return NextResponse.json({ message: 'Role not found' }, { status: 404 });
  }

  return NextResponse.json(role);
}

export async function PUT(request, { params }) {
  const roleId = params.id;
  const { name } = await request.json();

  const updateRole = await RoleModel.updateRole(roleId, { name });
  return NextResponse.json(updateRole);
}

export async function DELETE(request, { params }) {
  const roleId = params.id;
  await RoleModel.deleteRole(roleId);
  return NextResponse.json({ message: 'Role delete' }, { status: 200 });
}