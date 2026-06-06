export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface SavedCollege {
  college: {
    id: string;
    name: string;
    location: string;
    fees: number;
    rating: number;
    image: string | null;
    courses: string[];
    placements: string | null;
    overview: string | null;
    createdAt: Date;
  };
}

export async function POST(req: NextRequest) {
  const { userId, collegeId } = await req.json();

  if (!userId || !collegeId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const saved = await prisma.savedCollege.create({
    data: { userId, collegeId },
  });

  return NextResponse.json(saved);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const saved = await prisma.savedCollege.findMany({
    where: { userId },
    include: { college: true },
  });

  return NextResponse.json(saved.map((s: SavedCollege) => s.college));
}

export async function DELETE(req: NextRequest) {
  const { userId, collegeId } = await req.json();

  await prisma.savedCollege.deleteMany({
    where: { userId, collegeId },
  });

  return NextResponse.json({ message: "Removed" });
}