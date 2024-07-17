import { generateEventDescription } from "@/config/aiconfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { eventDetails } = body;

  if (!eventDetails) {
    return NextResponse.json(
      { error: "Event details are required" },
      { status: 201 }
    );
  }

  try {
    const description = await generateEventDescription(eventDetails);

    //   } catch (error) {
    //     return res.status(500).json({ error: error.message });
    //   }

    return NextResponse.json(description, { status: 201 });
  } catch (error) {
    console.error("Error creating event or sending Inngest event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
