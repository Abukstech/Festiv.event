import Hero from "@/app/_components/Hero";
import React from "react";
import Map from "../../../public/images/Rectangle 2.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Global_Icon } from "@/app/_components/global_Icon";
import prisma from "@/prisma/client";
import { SectionContainer } from "@/app/_components/sectionContainer";
import { ContentContainer } from "@/app/_components/contentContainer";

interface Props {
  params: {
    id: string;
  };
}

const EventDetailsPage = async ({ params: { id } }: Props) => {
  const event = await prisma.event.findUnique({
    where: {
      id: parseInt(id),
    },

    include: {
      user: true,
    },
  });

  return (
    <main className="relative">
      <div className="w-full  relative flex items-center ">
        <Image
          src={event?.eventImage!}
          alt={event?.name!}
          width={1000}
          height={1000}
          className="w-full h-[400px] md:h-[60vh]  object-cover"
        />
      </div>

      <section className=" flex flex-row justify-between space-x-10 mx-20 p-6">
        <SectionContainer
          title={"Event Details"}
          content={<p>{event?.eventDetails!}</p>}
        />
        <div className="flex- mt-[-100px] ml-[-100px] z-10">
          {/* Edit and delete event */}

          <div className="bg-white shadow-md  py-2 overflow-hidden flex flex-col gap-3 rounded-3xl px-2 w-[350px] border border-[#022543] ">
            <div className="flex flex-row justify-between px-3 items-center border-b py-2">
              <p>{event?.eventCategory}</p>
              <p className="text-sm text-gray-600">
                {event?.eventDate.map((dateTime: Date, index: number) => {
                  const formattedDate = dateTime.toLocaleDateString();
                  const formattedTime = dateTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <p key={index}>
                      {formattedDate} - {formattedTime}
                    </p>
                  );
                })}
              </p>
            </div>
            <p className=" text-[#022543] text-3xl leading-normal font-bold ">
              {event?.user?.organizationName}
            </p>

            <Image src={Map} className="w-full h-48 object-cover" alt="map" />
            <p className="text-gray-700">{event?.address}</p>
            <button className="mt-2 bg-white text-[#022543] text-2xl border-2 border-[#022543] w-full   py-1 px-3 rounded-[30px]">
              Book Ticket - ₦{event?.ticketPrice}
            </button>
          </div>
        </div>
      </section>

      <div className=" mx-20 min-w-[80%]">
        <SectionContainer
          title={"Rsvp"}
          content={
            <div className=" space-y-4 ">
              <ContentContainer title="Rsvp Name:" content={event?.rsvpName!} />
              <ContentContainer title="Rsvp Phone:" content={event?.rsvpTel!} />
            </div>
          }
        />
      </div>
    </main>
  );
};

export default EventDetailsPage;
