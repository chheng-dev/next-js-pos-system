import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const response = NextResponse.json({ message: 'Logged out successfully' });

    response.cookies.set('token', '/', { path: '/', maxAge: -1 });

    return response;
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Failed to log out' },
      { status: 500 }
    );
  }
}