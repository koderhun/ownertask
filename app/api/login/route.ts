import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/libs/auth";
import {users} from '@/constants'

interface Request {
  json(): Promise<any>;
}

interface Body {
  username: string;
  password: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  const body: Body = await request.json();
  console.log('body ', body)

  const valid = users.some((user) => user.email === body.username && user.password === body.password);
  console.log('valid ', valid)

  if (valid) {
    const token = await new SignJWT({
      username: body.username,
      role: "admin", 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30s") 
      .sign(getJwtSecretKey());

    const response = NextResponse.json(
      { success: true },
      { status: 200, headers: { "content-type": "application/json" } }
    );

    response.cookies.set({
      name: "token",
      value: token,
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ success: false });
}