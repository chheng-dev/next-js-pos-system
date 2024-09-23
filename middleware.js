import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value || request.headers.get('Authorization')?.replace('Bearer ', '');

  console.log("token", token);

  const publicPaths = ['/login', '/register'];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Function to check if the token is expired
  const isTokenExpired = async (token) => {
    if (!token) return true;
    try {
      // Use jwtVerify from jose to verify the token
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
      const currentTime = Date.now() / 1000; // Current time in seconds
      return payload.exp < currentTime; // Check if the token is expired
    } catch (err) {
      console.error('Token verification failed:', err);
      return true; // If verification fails, consider the token expired or invalid
    }
  };

  if (!token || await isTokenExpired(token)) {
    // Create a response that clears the token cookie
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token'); // Clear the token cookie on the server-side
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/menu", "/products", "/orders", "/profile", "/reports", "/reservation", "/staff", "/users"]
};
