"use client";
import { useEffect, useState } from "react";

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
    <div className="flex -space-x-4 mt-4">
      {avatarUrls.slice(0, 8).map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`User ${index}`}
          className="w-10 h-10 rounded-full border-2 border-white object-cover hover:scale-110 transition-all duration-300"
        />
      ))}
      {avatarUrls.length > 8 && (
        <span className="w-10 h-10 rounded-full bg-gray-300 text-sm flex items-center justify-center border-2 border-white">
          +{avatarUrls.length - 8}
        </span>
      )}
    </div>
  );
}
