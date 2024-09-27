// // app/api/protected-route/route.js
// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

// export async function GET(request) {
//   const authHeader = request.headers.get('Authorization');
//   const token = authHeader?.split(' ')[1]; 
//   const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

//   if (!token) {
//     return NextResponse.json({ message: 'No token provided' }, { status: 401 });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     return NextResponse.json({ message: 'Protected data', user: decoded });
//   } catch (error) {
//     return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
//   }
// }


// const verifyTokenAndPermissions = async (req) => {
//   const token = req.cookies.get('token')?.value || req.headers.get('Authorization');

//   if (!token) {
//     return { authorized: false, message: 'No token provided' };
//   }

//   try {
//     const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));

//     const roles = payload.roles || [];
//     const permissions = payload.permissions || [];

//     const requiredRoles = ["admin", "editor"];

//     const hasAccess = requiredRoles.some(role => roles.includes(role)) || permissions.includes('full_access');

//     return { authorized: hasAccess, user: payload };
//   } catch (error) {
//     console.error('Token verfification failed: ', error);
//     return { authorized: false, message: 'Invalid token' };
//   }
// }

// export async function GET(request) {
//   const { authorized, message, user } = await verifyTokenAndPermissions(request);

//   if (!authorized) {
//     return NextResponse.json({ message }, { status: 403 }) // Forbidden
//   }

//   return NextResponse.json({ message: 'Access granred to protected data!', user });
// }

import { NextResponse } from 'next/server';
import { authMiddleware } from '../middleware/authMiddleware'; // Adjust the path as needed

export async function GET(request) {
  const response = await authMiddleware(request); // Call the authentication middleware

  if (response) return response; // If unauthorized, return the response

  return NextResponse.json({ message: 'This is a protected route!' });
}

