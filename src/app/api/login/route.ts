import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await axios.post(
      'http://ec2-34-206-72-0.compute-1.amazonaws.com:8081/login',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || 'Login failed',
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: 'Login failed' },
      { status: 500 }
    );
  }
}
