"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function AvatarCircles() {
  const [avatarUrls, setAvatarUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      const res = await fetch("/api/useravatar");
      const data = await res.json();
      setAvatarUrls(data.avatarUrls || []);
    };
    fetchAvatars();
  }, []);

  return (
    <div className="flex -space-x-2.5 overflow-hidden">
      {avatarUrls.slice(0, 6).map((url, index) => (
        <div
          key={index}
          className={cn(
            "relative group",
            index > 0 && "transition-transform duration-300 hover:-translate-x-1"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/30 dark:from-primary/10 dark:to-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="h-9 w-9 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
            <img
              src={url}
              alt={`User ${index}`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ))}
      {avatarUrls.length > 6 && (
        <div 
          className="h-9 w-9 rounded-full border-2 border-white dark:border-gray-800 bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-xs font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          +{avatarUrls.length - 6}
        </div>
      )}
    </div>
  );
}
