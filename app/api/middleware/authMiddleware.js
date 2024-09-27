// import { NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

// export async function authMiddleware(request) {
//   const token = request.cookies.get('token')?.value || request.headers.get('Authorization')?.replace('Bearer ', '');

//   // Function to check if the token is expired
//   const isTokenExpired = async (token) => {
//     if (!token) return true;
//     try {
//       const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
//       const currentTime = Date.now() / 1000; // Current time in seconds
//       return payload.exp < currentTime; // Check if the token is expired
//     } catch (err) {
//       console.error('Token verification failed:', err);
//       return true; // Treat any error as an expired/invalid token
//     }
//   };

//   if (!token || await isTokenExpired(token)) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }); // Return unauthorized response
//   }

//   // Decode token to extract roles and permissions
//   let decodedToken;
//   try {
//     decodedToken = await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }); // Return unauthorized response
//   }

//   const { roles = [], permissions = [] } = decodedToken.payload;

//   // Implement role-based access control logic here if needed

//   return NextResponse.next(); // Proceed to the next middleware or request handler
// }

// import { NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

// export async function authMiddleware(request) {
//   // const { pathname } = request.nextUrl;
//   console.log("pathname", request.nextUrl)
//   const token = request.cookies.get('token')?.value || request.headers.get('Authorization')?.replace('Bearer ', '');

//   console.log("Token:", token); // Log the token to check its value

//   const publicPaths = ['/login', '/register'];
//   const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

//   const isTokenExpired = async (token) => {
//     if (!token) return true;
//     try {
//       const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
//       const currentTime = Date.now() / 1000;
//       return payload.exp < currentTime;
//     } catch (err) {
//       console.error('Token verification failed:', err);
//       return true;
//     }
//   };

//   if (!token || await isTokenExpired(token)) {
//     const response = NextResponse.redirect(new URL('/login', request.url));
//     response.cookies.delete('token');
//     return response;
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard', '/menu', '/products', '/orders', '/profile', '/reports', '/reservation', '/staff', '/users'],
// };
