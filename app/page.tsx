"use server";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { inngest } from "@/inngest";
import prisma from "@/prisma/client";

import { user } from "@prisma/client";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";
import Hero from "./_components/Hero";
import App from "./Home";
import { EventType } from "@/types/events";
import EventList from "./_components/EventList";

export default async function Home() {
  const events: any = await prisma.event.findMany({
    
    include: {
      user: true, // Assuming 'user' is the field name in event referring to the user who created it
    },
  });

  console.log(events);
  // console.log("Users", usercount);

  return (
    <main>
      <Hero />
      <App events={events} />

      {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div> */}

      {/* <section>
        {usercount &&
          usercount.map((user: any) => (
            <p key={user.xata_id}>{user.firstName}</p>
          ))}
      </section> */}
    </main>
  );
}
