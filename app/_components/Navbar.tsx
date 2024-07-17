"use client";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/Frame 44 (1).png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src={logo} alt="logo" className="w-[150px] h-auto" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <SignedOut>
                <Link href="/signup">
                  <button className="px-5 py-2 border-2 border-primary bg-secondary text-primary rounded-[80px]">
                    Create An Account
                  </button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/">
                  <button className="px-5 py-2 border-2 border-primary bg-secondary text-primary rounded-[80px]">
                    Explore
                  </button>
                </Link>
                <Link href="/portal">
                  <button className="px-5 py-2 border-2 border-primary bg-secondary text-primary rounded-[80px]">
                    My Dashboard
                  </button>
                </Link>
                <SignOutButton>
                  <button className="px-5 py-2 border-2 border-primary bg-secondary text-primary rounded-[80px]">
                    Sign Out
                  </button>
                </SignOutButton>
              </SignedIn>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
              aria-expanded="false"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <SignedOut>
            <Link href="/signup">
              <button className="w-full text-left px-5 py-2 border-2 border-primary bg-secondary text-primary rounded-[80px]">
                Create An Account
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/">
              <button className="w-full text-left px-5 py-2 border-2 border-primary bg-secondary text-primary rounded-[80px]">
                Explore
              </button>
            </Link>
            <Link href="/portal">
              <button className="w-full text-left px-5 py-2 border-2 border-primary bg-secondary text-primary rounded-[80px]">
                My Dashboard
              </button>
            </Link>
            <SignOutButton>
              <button className="w-full text-left px-5 py-2 border-2 border-primary bg-secondary text-primary rounded-[80px]">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
