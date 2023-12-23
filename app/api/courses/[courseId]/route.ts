/** @format */
import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { isTeacher } from "@/lib/teacher";
const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);
type Props = {
  params: { courseId: string };
};
export async function DELETE(eq: Request, { params: { courseId } }: Props) {
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
    for (const chapter of course.chapters) {
      // manually delete the assets from mux
      // muxData will automatically deleted on chapter deletetion and all chapters will automatically deleted on course delete bacause will added Cascade on Delete in schema model
      if (chapter.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }
    const deletedCourse = await db.course.delete({
      where: {
        id: courseId,
      },
    });
    return NextResponse.json(deletedCourse, { status: 200 });
  } catch (error) {
    console.log("Course Id api delete route error ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params: { courseId } }: Props) {
  try {
    const { userId } = auth();
    const values = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("Course Id api patch route error ->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
