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


export async function GET(request, { params }) {
  const { id } = params
  try {
    if (!id) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await UserModel.getUserById(id);

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to fetch user',
        error: error.message,
      },
      { status: 500 }
    );
  }
}