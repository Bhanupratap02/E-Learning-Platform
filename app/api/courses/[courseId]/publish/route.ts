/** @format */

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type Props = {
  params: { courseId: string };
};
export async function PATCH(req: Request, { params: { courseId } }: Props) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });
    if (!course) {
      return new NextResponse("Course Not Found", { status: 404 });
    }
    const hasPublishedChapter = course.chapters.some(
      (chapter) => chapter.isPublished
    );
    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId ||
      !hasPublishedChapter
    ) {
      return new NextResponse("Missing required fields", { status: 401 });
    }
    const courseToPublish = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(courseToPublish);
  } catch (error) {
    console.log("Course Id Publish api route error ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
