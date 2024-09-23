import { NextResponse } from "next/server";
import { UserModel } from "../../../../models/userModel";

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const result = await UserModel.deleteUserById(id);

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error.json,
      message: 'Failed to delete user',
    }, {
      status: 500
    })
  }
}