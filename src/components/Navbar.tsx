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
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Navbar({ className }: { className?: string }) {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Courses", link: "/gallery" },
    ...(session?.user ? [
      { name: "Create Courses", link: "/create" },
      { name: "Settings", link: "/settings" }
    ] : [])
  ];

  return (
    <ResizableNavbar>
      <NavBody className={cn( "bg-transparent shadow-md rounded-xl border backdrop-blur-md p-3 sm:p-4 md:p-5 fixed inset-x-0 top-2 z-50 max-w-7xl mx-auto px-4 sm:px-6" , className)}>
        <Link href="/" className="flex items-center gap-2 cursor-pointer z-10">
          <span className="text-lg sm:text-xl  tracking-tight text-black dark:text-white  font-mono">
          𝕮𝖔𝖗𝖘𝖚.𝖆𝖎
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavItems items={navItems} className="text-sm sm:text-md hidden sm:flex" />

        {/* Mobile Navigation */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
  <div className="absolute  left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 sm:hidden z-50">
    <div className="px-4 py-2 space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {item.name}
        </Link>
      ))}
    </div>
  </div>
)}

        <div className="flex items-center gap-2 sm:gap-4 z-10">
          <ModeToggle />
          {session?.user ? <UserAccount user={session.user} /> : <Signinbutton />}
        </div>
      </NavBody>
    </ResizableNavbar>
  );
}
