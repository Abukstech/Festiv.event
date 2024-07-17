"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import Link from "next/link";
import { SideBarButton } from "./sideBarButton";


const menuItems = [
  { name: "Events", icon: "fluent:people-checkmark-24-filled", link: "/" },
  {
    name: "Settings",
    icon: "fluent:people-checkmark-24-filled",
    link: "/settings",
  },
  {
    name: "Profile",
    icon: "fluent:people-checkmark-24-filled",
    link: "/vendor_profile",
  },
  { name: "Sign Out", icon: "fluent:people-checkmark-24-filled", link: "" },
];



export const SideBar = () => {
  return (
    <div className="space-y-1 p-4">
      {menuItems.map((item, i) =>
     
          <SideBarButton key={i} item={item} />
        
      )}
    </div>

    // <div className="space-y-1 p-4">
    //   {menuItems.map((item, i) => (
    //     item.link ? (
    //       <a key={i} href={item.link} className="sidebar-link">
    //         <span>{item.name}</span>
    //         <span>{item.icon}</span>
    //       </a>
    //     ) : item.name === "Events" ? (
    //       // <EventsComponent key={i} />
    //     ) : (
    //       <SignOutComponent key={i} />
    //     )
    //   ))}
    // </div>
    // <div className="space-y-1 p-4">
    //   {menuItems.map((item, i: number) => (
    //     <SideBarButton key={i} item={item} />
    //   ))}
    // </div>
  );
};
