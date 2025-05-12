"use client";

import { useSession } from "next-auth/react";
import { Useravatar } from "./useravatar";
import { Button } from "./ui/button";

export const ProfileSection = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === "loading") {
    return <p className="text-center text-sm text-gray-500">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center text-sm text-red-500">User not logged in.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="bg-neutral-100 dark:bg-neutral-900 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1 text-center md:text-left">Profile Information</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm text-center md:text-left">
            Update your account information and profile settings
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          <div className="flex-shrink-0 self-center md:self-start">
            <div className="w-24 h-24 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center overflow-hidden border-4 border-white dark:border-neutral-600">
              <Useravatar user={user} />
            </div>
            
          </div>

          {/* Editable Fields */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user?.name || ""}
                className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue={user?.email || ""}
                className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                placeholder="email@example.com"
              />
            </div>

            <div className="flex justify-end  mt-4">
              <Button className="bg-black dark:bg-white text-white dark:text-black border-black/10 dark:border-white/10 border">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
