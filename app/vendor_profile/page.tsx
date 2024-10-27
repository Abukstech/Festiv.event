import Image from "next/image";
import React from "react";
import coverImage from "../../public/images/coverImage.png";
import logo from "../../public/images/musicfestLogo.png";
import { Icon } from "@iconify/react";
import { HeroSection } from "./_comps/profile_heroSection";
import { SectionTitleBar } from "../_components/sectionTitleBar";
import { SectionContainer } from "../_components/sectionContainer";
import EventCard from "../_components/EventCard";
import evtImg from "../../public/images/Rectangle 1.svg";
import EventCard_h from "../_components/EventCard_h";
import { ContentContainer } from "../_components/contentContainer";
import prisma from "@/prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const events = [
  {
    id: 1,
    date: "2024-12-04",
    category: "Music Concert",
    title: "Music Fest",
    eventType: "Digital",
    organizer: "Favour Entertainment",
    location: "National Stadium, Lagos",
    image: evtImg,
    time: "2:00 PM - 6:00 PM",
  },

  {
    id: 2,
    date: "2024-12-04",
    category: "Music Concert",
    title: "Music Fest",
    eventType: "Digital",
    organizer: "Favour Entertainment",
    location: "National Stadium, Lagos",
    image: evtImg,
    time: "2:00 PM - 6:00 PM",
  },

  {
    id: 1,
    date: "2024-12-04",
    category: "Music Concert",
    title: "Music Fest",
    eventType: "Digital",
    organizer: "Favour Entertainment",
    location: "National Stadium, Lagos",
    image: evtImg,
    time: "2:00 PM - 6:00 PM",
  },
  // Add more events
];

const Vendor_profile = async () => {
  const currUser = await currentUser();

  const eventHost = await prisma.user.findUnique({
    where: {
      clerkUserId: currUser?.id,
    },
  });

  console.log(eventHost);

  const properties = await prisma.event.findMany({
    orderBy: {
      xata_updatedat: "desc",
    },

    where: {
      userId: eventHost?.clerkUserId,
    },
  });
  return (
    <div>
      <HeroSection
        name={eventHost?.organizationName}
        imageUrl={eventHost?.profilePic}
      />
      <div className="flex px-16">
        {/* //left panel */}
        <div className="space-y-4">
          <SectionContainer
            title={"About Us"}
            content={<p>{eventHost?.aboutUs}</p>}
          />

          <SectionContainer
            title={"Our Services"}
            content={
              <div className="flex gap-4">
                {eventHost?.services &&
                  eventHost.services.map((t, i) => (
                    <ContentContainer key={i} content={t} />
                  ))}
              </div>
            }
          />

          <SectionContainer
            title={"Contact"}
            content={
              <div className=" space-y-4 ">
                <ContentContainer
                  title="Address:"
                  content={eventHost?.address!}
                />
                <ContentContainer title="Phone:" content={eventHost?.phone!} />
                <ContentContainer title="Email:" content={eventHost?.email!} />
                <ContentContainer
                  title="Website:"
                  content="organizationwebsite.com"
                />
              </div>
            }
          />
        </div>

        {/* //left panel */}
        <div className=" min-w-[35%]">
          <SectionContainer
            title={"Porfolio"}
            content={
              <div className=" flex flex-wrap gap-2">
                {properties.map((t: any, k: number) => (
                  <EventCard_h key={k} event={t} />
                ))}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Vendor_profile;
