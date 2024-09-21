import { authService } from "@/services/authService";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    // Log the parsed body for debugging
    console.log({ username, email, password });

    const result = await authService.register(username, email, password);

    return NextResponse.json({ user: result });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        error,
        message: 'Failed to create a user'
      },
      {
        status: 500
      }
    );
  }
}
