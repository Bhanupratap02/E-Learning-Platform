/** @format */

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type Props = {
  params: { courseId: string; chapterId: string };
};
export async function PATCH(
  req: Request,
  { params: { courseId, chapterId } }: Props
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const ownCourse = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!ownCourse) {
      return new NextResponse("Forbidden", { status: 402 });
    }
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId,
      },
    });
    const muxData = await db.muxData.findUnique({
      where: {
        chapterId,
      },
    });
    if (
      !chapter ||
      !muxData ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    // Update the chapter in the database
    const chapterToPublish = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(chapterToPublish);
  } catch (error) {
    console.log("Course chapter Publish api route error ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
