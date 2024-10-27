import { inngest } from "@/inngest";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const data = body;

    await inngest.send({
      name: "app/event.create",
      data: data,
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating event or sending Inngest event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

 