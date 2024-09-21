// app/api/protected-route/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1]; 
  const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ message: 'Protected data', user: decoded });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
  }
}
