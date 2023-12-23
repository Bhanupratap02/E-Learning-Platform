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
 
  

    const chapterToUnpublish = await db.chapter.update({
      where: {
        id: chapterId,
        courseId,
      },
      data: {
        isPublished: false,
      },
    });
     const publishedChaptersInCourse = await db.chapter.findMany({
       where: {
         courseId,
         isPublished: true,
       },
     });
         if (!publishedChaptersInCourse.length) {
           await db.course.update({
             where: {
               id: courseId,
             },
             data: {
               isPublished: false,
             },
           });
         }
    return NextResponse.json(chapterToUnpublish);
  } catch (error) {
    console.log("Course chapter Unpublish api route error ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
