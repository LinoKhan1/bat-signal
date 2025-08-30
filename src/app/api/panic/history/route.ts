// src/app/api/panic/history/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import axios from "axios";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.token) {
    return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const statusId = url.searchParams.get("status_id") ? parseInt(url.searchParams.get("status_id")!) : undefined;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/panic/history`, {
      headers: { Authorization: `Bearer ${session.user.token}` },
      params: { status_id: statusId },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch panic history";
    return NextResponse.json({ status: "error", message }, { status: 400 });
  }
}