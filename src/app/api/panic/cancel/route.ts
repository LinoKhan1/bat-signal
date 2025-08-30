// src/app/api/panic/cancel/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import axios from "axios";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.token) {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }

  const { panic_id } = await req.json();

  if (!panic_id || typeof panic_id !== "number") {
    return NextResponse.json(
      { status: "error", message: "Panic ID is required and must be a number" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/panic/cancel`,
      { panic_id },
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to cancel panic";
    return NextResponse.json({ status: "error", message }, { status: 400 });
  }
}