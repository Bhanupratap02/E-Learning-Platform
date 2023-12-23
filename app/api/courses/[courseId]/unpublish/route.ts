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
    });
    if (!course) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    const courseToUnpublish = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });
    return NextResponse.json(courseToUnpublish);
  } catch (error) {
    console.log("Course Id Unpublish api route error ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
