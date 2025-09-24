import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { encryptString, decryptString } from "@/lib/encryption";

const ITEMS_PER_PAGE = 10;

export async function GET(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId,
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        // content is encrypted; to support content search, store a plaintext index separately in future
      ],
    },
    orderBy: { createdAt: "desc" },
    take: ITEMS_PER_PAGE,
    skip: (page - 1) * ITEMS_PER_PAGE,
  });

  const totalItems = await prisma.journalEntry.count({
    where: {
      userId,
      OR: [{ title: { contains: search, mode: "insensitive" } }],
    },
  });

  const safe = entries.map((e) => ({ ...e, content: decryptString(e.content) }));

  return NextResponse.json({
    entries: safe,
    currentPage: page,
    totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
  });
}

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content, mood, emotionalAnalysis } = await req.json();
  const entry = await prisma.journalEntry.create({
    data: { 
      title, 
      content: encryptString(content || ""), 
      mood, 
      userId
      // emotionalAnalysis field temporarily removed due to migration issues
    },
  });
  
  return NextResponse.json({ 
    ...entry, 
    content, 
    emotionalAnalysis 
  }, { status: 201 });
}


