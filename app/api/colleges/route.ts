export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const location = searchParams.get("location") || "";

  const colleges = await prisma.college.findMany({
    where: {
      AND: [
        { name: { contains: search, mode: "insensitive" } },
        location ? { location: { contains: location, mode: "insensitive" } } : {},
      ],
    },
    orderBy: { rating: "desc" },
  });

  return NextResponse.json(colleges);
}