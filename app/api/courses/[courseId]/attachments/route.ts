/** @format */

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type Props = {
  params: { courseId: string };
};
export async function POST(req: Request, { params: { courseId } }: Props) {
  try {
    const { userId } = auth();
    const { url } = await req.json();
    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Forbidden", { status: 403 });
    }
    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: courseId,
      },
    });
    return NextResponse.json(attachment);
  } catch (error) {
    console.log("Course Id attachments api route error ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
