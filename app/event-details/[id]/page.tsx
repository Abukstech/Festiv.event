import Hero from "@/app/_components/Hero";
import React from "react";
import Map from "../../../public/images/Rectangle 2.svg";
import Image from "next/image";
import prisma from "@/prisma/client";

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
          width={100}
          height={100}
          className="w-full h-[400px] md:h-[60vh]  object-cover"
        />
      </div>

      <section className=" flex flex-row justify-between space-x-10 mx-20 p-6">
        <article className="flex flex-col items-center flex-1  ">
          <p className="max-w-[880px] ">{event?.eventDetails}</p>
        </article>

        <div className="flex-1 mt-[-100px] z-10">
          <div className="bg-white shadow-md  py-2 overflow-hidden flex flex-col gap-3 rounded-[30px] px-4 max-w-[400px] border border-[#022543] ">
            <div className="flex flex-row justify-between px-3 items-center border-b py-2">
              <p>Digital</p>
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
    </main>
  );
};

export default EventDetailsPage;
