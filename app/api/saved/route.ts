import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Save a college
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

// Get saved colleges
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

  return NextResponse.json(saved.map((s) => s.college));
}

// Unsave a college
export async function DELETE(req: NextRequest) {
  const { userId, collegeId } = await req.json();

  await prisma.savedCollege.deleteMany({
    where: { userId, collegeId },
  });

  return NextResponse.json({ message: "Removed" });
}