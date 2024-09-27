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

export async function PUT(request, { params }) {
  const userId = params.id;

  try {
    const { full_name, username, email, password, is_active, image } = await request.json();

    console.log('hello', { full_name, username, email, password, is_active, image });

    if (!userId || !full_name || !username || !email) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updatedUser = await UserModel.updateUser(userId, { full_name, username, email, password, is_active, image });

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      {
        message: 'Failed to update user',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
