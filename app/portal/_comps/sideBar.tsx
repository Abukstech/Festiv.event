'use client'
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import Link from "next/link";
import { SideBarButton } from './sideBarButton'

const menuItems = [
  { name: "Events", icon: "fluent:people-checkmark-24-filled", link: "" },
  { name: "Feedback", icon: "fluent:people-checkmark-24-filled", link: "" },
  {
    name: "Profile",
    icon: "fluent:people-checkmark-24-filled",
    link: "/settings",
  },
  { name: "Sign Out", icon: "fluent:people-checkmark-24-filled", link: "" },
];

export const SideBar = () => {

  return (
    <div className='space-y-1 p-4'>
{menuItems.map((item,i:number)=>(
<SideBarButton key={i} item={item} />
))}
    </div>
  );
};
