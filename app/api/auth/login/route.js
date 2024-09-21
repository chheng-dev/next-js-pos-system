import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    console.log({ username, password });

    const query = `SELECT * FROM users WHERE username = $1`;
    const { rows } = await pool.query(query, [username]);
    const user = rows[0];

    if (!user) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the token and user information
    return NextResponse.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });


    // Set the token in a HttpOnly cookie
    // const response = NextResponse.json({ message: 'Login Successful' });

    // response.cookies.set('token', token, {
    //   httpOnly: true, // Prevent Javascript access to the cookie
    //   secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    //   sameSite: 'strict', // Help prevent CSRF attacks
    //   maxAge: 60 * 60, // Token expiration in secaonds (1 hour)
    //   path: '/' // Cokkie is accessible across
    // })

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        error,
        message: 'Failed to log in',
      },
      { status: 500 }
    );
  }
}
