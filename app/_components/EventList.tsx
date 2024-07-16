"use client";
import React, { useEffect, useState } from "react";
import evtImg from "../../public/images/Rectangle 1.svg";

import EventCard from "./EventCard";
import CategoryFilter from "./CategoryList";
import prisma from "../../prisma/client";
import { EventType } from "@/types/events";
import { formatDate } from "@/config/helper";

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

type EventListProps = {
  events: EventType[];
};

const EventList: React.FC<EventListProps> = ({ events }) => {
  // const [selectedCategory, setSelectedCategory] = useState("All Categories");
  // const [selectedDate, setSelectedDate] = useState(Date);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredEvents = events.filter((event) => {
    const eventDates = event.eventDate.map((date) => formatDate(date));
    const isDateMatch = selectedDate ? eventDates.includes(selectedDate) : true;
    const isCategoryMatch =
      selectedCategory === "All Categories" ||
      event.eventCategory === selectedCategory;

    return isDateMatch && isCategoryMatch;
  });

  // const filteredEvents = events.filter((event) => {
  //   const isDateMatch = selectedDate
  //     ? event.eventDate.some((date) => date === selectedDate)
  //     : true;
  //   const isCategoryMatch =
  //     selectedCategory === "All Categories" ||
  //     event.eventCategory === selectedCategory;

  //   return isDateMatch && isCategoryMatch;
  // });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="">
        <CategoryFilter
          category={selectedCategory}
          setCategory={setSelectedCategory}
          date={selectedDate}
          setDate={setSelectedDate}
        />
      </div>
      <div className="flex  justify-center items-center">

      <div className="grid  justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
        {filteredEvents.map((event) => (
          <div key={event.id}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
  // const filteredEvents = category === 'All Categories' ? events : events.filter(event => event.category === category);

  // return (
  //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:max-w-[1290px]">
  //     {filteredEvents.map(event => (
  //       <EventCard event={event} key={event.id} />
  //     ))}
  //   </div>
  // );
};

export default EventList;
