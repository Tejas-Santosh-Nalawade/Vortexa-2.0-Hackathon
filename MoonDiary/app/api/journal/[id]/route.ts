import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { encryptString, decryptString } from "@/lib/encryption";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content, mood } = await req.json();
  const entry = await prisma.journalEntry.findUnique({ where: { id: params.id } });
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (entry.userId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const updated = await prisma.journalEntry.update({
    where: { id: params.id },
    data: {
      title: title ?? entry.title,
      content: content !== undefined ? encryptString(content) : entry.content,
      mood: mood ?? entry.mood,
    },
  });

  return NextResponse.json({ ...updated, content: content ?? decryptString(updated.content) });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const entry = await prisma.journalEntry.findUnique({ where: { id: params.id } });
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (entry.userId !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.journalEntry.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
}


