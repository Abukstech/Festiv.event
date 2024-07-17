import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import Link from "next/link";

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
    <div className="space-y-1 p-4">
      {menuItems.map((item, i: number) => (
        <Button key={i} className="flex gap-2 ">
          <Icon icon={item.icon} className="h-6 w-6" />
          <Link href={item.link}>{item.name}</Link>
        </Button>
      ))}
    </div>
  );
};
