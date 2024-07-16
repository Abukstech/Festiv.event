"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { EventType } from "@/types/events";

const EventCard_h = ({ event }: { event: EventType }) => {
  return (
    <div className="bg-white shadow-md  cursor-default  transition-all ease-out   flex overflow-hidden group  flex-wrap w-[200px]  rounded-2xl  h-fit transform hover:z-20 hover:border hover:scale-105 ">
      <Image
        alt={event.name || ""}
        src={event.eventImage || ""}
        width={30}
        height={30}
        className="md:w-full h-full  w-full"
      />
      <div className=" bg-white w-full sm:mt-[-20px] flex flex-col gap-2 border-[#022543]   ">
        <div className="flex flex-col justify-between px-5 items-center border-b py-1">
          <p className="text-sm sm:text-base ">{event.eventCategory || ""}</p>
          <p>
            {event.eventDate.map((dateTime: Date, index: number) => {
              const formattedDate = dateTime.toLocaleDateString();
              const formattedTime = dateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <p className="text-sm text-gray-600 whitespace-nowrap" key={index}>
                  {formattedTime}
                </p>
              );
            })}
          </p>
        </div>
        <div className="p-2">
          <h3 className="text-lg font-bold">{event.name}</h3>
          <p className=" text-[#022543] text-xl sm:text-xl md:text-xl font-bold ">
            {event.user?.organizationName || ""}
          </p>
          <p className="text-sm text-[#022543] font-normal">
            {event.address || ""}
            <div className="flex gap-4 ">
              <div className="flex gap-2 items-center  font-medium  ">
                <Icon
                  icon="fluent:star-20-filled"
                  className="h-4 w-4 text-[#DA9352]"
                />
                <p className="font-bold">3.4</p>
              </div>
              <div className="flex gap-2 items-center  font-medium  ">
                <Icon
                  icon="fluent:people-checkmark-24-filled"
                  className="h-4 w-4"
                />
                <p className="font-bold">200</p>
              </div>
            </div>
          </p>
        </div>
        <Link href={`/event-details/${event.id || ""}`}>
          <button className=" bg-muted transition-colors duration-300 ease-in text-[#022543] text-xs w-full py-1 px-3 group-hover:bg-primary group-hover:text-card">
            View Event information
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard_h;
