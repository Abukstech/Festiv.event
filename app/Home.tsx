"use client";
import React from "react";
import EventList from "./_components/EventList";
import CategoryFilter from "./_components/CategoryList";
import { EventType } from "@/types/events";

const App = ({ events }: { events: any[] }) => {
  

  return (
    <div className="container md:mx-auto p-4 md:max-w-[90%]  w-full">
      
      <EventList events={events} />
   
    </div>
  );
};

export default App;
