import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value || request.headers.get('Authorization');
  console.log("token", token);

  const publicPaths = ['/login', '/register']; // Add any other public paths here
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (!isPublicPath && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)", // Apply middleware to all paths except certain public paths
};
