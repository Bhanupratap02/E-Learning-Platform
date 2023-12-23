/** @format */

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type Props = {
  params: {
    courseId: string;
    attachmentId: string;
  };
};
export async function DELETE(
  req: Request,
  { params: { courseId, attachmentId } }: Props
) {
  try {
    const { userId } = auth();
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
    const attachment = await db.attachment.delete({
      where: {
        courseId,
        id: attachmentId,
      },
    });
    return NextResponse.json(attachment);
  } catch (error) {
    console.log(" attachments id api delete route error ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
