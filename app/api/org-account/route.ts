import { inngest } from "@/inngest";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";





export async function POST(req: NextRequest) {
    const user = await  currentUser()
  const body = await req.json();

  try {
    const data = body;

    await inngest.send({
        name: "app/user.synced",
        data: {
          clerkUserId: user?.id,
          email: user?.emailAddresses[0].emailAddress,
          firstName: user?.firstName,
          lastName: user?.lastName,
          profilePic: user?.imageUrl,
          role: "USER",
          organizationName: data.organizationName,
          address: data.address,
          state: data.state,
          country: data.country,
          phone: data.mainPhone,
          aboutUs: data.aboutOrganization,
          services: data.services,
          socialMediaLinks: data.socialMedia.map((sm: any) => ({
            platform: sm.platform,
            link: sm.link,
          })),
        },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
     console.error("Error syncing user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
