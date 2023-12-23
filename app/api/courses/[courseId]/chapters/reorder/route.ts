/** @format */

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { NextResponse } from "next/server";

type Props = {
  params: { courseId: string };
};
export async function PUT(req: Request, { params: { courseId } }: Props) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { list } = await req.json();
    const ownCourse = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!ownCourse) {
      return new NextResponse("Forbidden", { status: 403 });
    }
    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("reorder api route error ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
