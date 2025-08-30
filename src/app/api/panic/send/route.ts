// src/app/api/panic/send/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import axios from "axios";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.token) {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }

  const { longitude, latitude, panic_type, details } = await req.json();

  if (!longitude || !latitude) {
    return NextResponse.json(
      { status: "error", message: "Longitude and latitude are required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/panic/send`,
      { longitude, latitude, panic_type, details },
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send panic";
    return NextResponse.json({ status: "error", message }, { status: 400 });
  }
}