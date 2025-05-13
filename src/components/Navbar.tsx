"use client";

import { getAuthSession } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { UserAccount } from "./userAccount";
import { Signinbutton } from "./Signinbutton";
import { ModeToggle } from "./theme-provider";
import { Navbar as ResizableNavbar, NavBody, NavItems } from "./ui/resizable-navbar";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Navbar({ className }: { className?: string }) {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Courses", link: "/gallery" },
    ...(session?.user ? [
      { name: "Create Courses", link: "/create" },
      { name: "Settings", link: "/settings" },
    ] : [])
  ];

  return (
    <>
      {/* Desktop & Tablet Navbar */}
      <div className="hidden sm:block">
        <ResizableNavbar>
          <NavBody className={cn("bg-transparent shadow-lg rounded-xl border backdrop-blur-md p-3 sm:p-4 md:p-5 fixed inset-x-0 top-2 z-50 max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-300", className)}>
            <Link href="/" className="flex items-center gap-2 cursor-pointer z-10 group">
              <span className="text-lg sm:text-xl tracking-tight text-black dark:text-white font-mono transition-all duration-300 group-hover:tracking-widest">
                𝕮𝖔𝖗𝖘𝖚.𝖆𝖎
              </span>
            </Link>

            <NavItems items={navItems} className="text-sm sm:text-md hidden sm:flex font-medium" />

            <div className="flex items-center gap-2 sm:gap-4 z-10">
              <ModeToggle />
              {session?.user ? <UserAccount user={session.user} /> : <Signinbutton />}
            </div>
          </NavBody>
        </ResizableNavbar>
      </div>

      {/* Mobile Navbar */}
      <div className="sm:hidden fixed top-0 inset-x-0 z-50 bg-transparent backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-lg font-mono font-semibold text-black dark:text-white transition-all duration-300">
          𝕮𝖔𝖗𝖘𝖚.𝖆𝖎
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden mt-16 px-4 py-4 absolute z-40 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="block w-full px-4 py-3 mb-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-3 px-4">
            {session?.user ? <UserAccount user={session.user} /> : <Signinbutton />}
          </div>
        </div>
      )}
    </>
  );
}
