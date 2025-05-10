import { Chapter, Unit } from "@prisma/client";
import React from "react";
import { Play, BookOpen } from "lucide-react"; 

type Props = {
  chapter: Chapter;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
};

export const MainVideoSummary = ({
  unit,
  unitIndex,
  chapter,
  chapterIndex,
}: Props) => {
  return (
    <div className="flex-[2] mt-8 sm:mt-12 md:mt-16 mx-4 sm:mx-6 rounded-lg shadow-xl p-4 sm:p-5 md:p-6 text-black dark:text-blue bg-neutral-300 dark:bg-neutral-900">
      <div className="flex items-center space-x-2 text-black dark-text-white">
        <BookOpen size={18} className="sm:w-5 sm:h-5 text-black dark:text-white" />
        <h4 className="text-xs sm:text-sm uppercase text-black dark:text-white">
          Unit {unitIndex + 1} &bull; Chapter {chapterIndex + 1}
        </h4>
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4 sm:mb-6 text-transparent bg-clip-text">
        {chapter.name}
      </h1>
      <div className="relative rounded-lg overflow-hidden shadow-md">
        <iframe
          title="chapter video"
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${chapter.videoId}`}
          allowFullScreen
        />
      </div>
      <div className="mt-6 sm:mt-8">
        <h3 className="text-xl sm:text-2xl font-semibold flex items-center space-x-2  ">
          <span className="text-black dark:text-white">#</span>
          <span className="text-black dark:text-white">Summary</span>
        </h3>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-black dark:text-white leading-relaxed">
          {chapter.summary}
        </p>
      </div>
    </div>
  );
};