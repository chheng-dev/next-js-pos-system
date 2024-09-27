
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { UserModel } from "../../../models/userModel";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");
    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

    let decoded;

    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error('Token verification error:', error);
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    const user = await UserModel.getUserById(decoded.id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      role: user.role,
      password: user.password,
      imageUrl: user.image
    }, { status: 200 });

  } catch (error) {
    console.error('Error retrieving user profile:', error);
    return NextResponse.json(
      {
        error: error.message || 'Internal Server Error',
        message: 'Failed to retrieve the user profile',
      },
      {
        status: 500,
      }
    );
  }
}