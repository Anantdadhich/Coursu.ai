import { Chapter, Courses, Unit } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Clock, BookOpen, ChevronRight } from "lucide-react";

type Props = {
  course: Courses & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

const GalleryCourseCard = ({ course }: Props) => {
  const totalChapters = course.units.reduce((acc, unit) => acc + unit.chapters.length, 0);
  const estimatedTime = totalChapters * 30; 

  return (
    <div className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <Link href={`/course/${course.id}/0/0`} className="block">
        <div className="relative">
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Image
            src={course.image || "/default-image.jpg"}
            className="object-cover w-full h-48 sm:h-56 transition-transform duration-500 group-hover:scale-110"
            width={400}
            height={224}
            alt={`Cover for ${course.name}`}
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-2 line-clamp-2 drop-shadow-lg group-hover:scale-105 origin-left transition-transform duration-300">
              {course.name}
            </h3>
            <div className="flex items-center text-white/90 text-sm space-x-4">
              <div className="flex items-center bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full transition-all duration-300 group-hover:bg-black/60">
                <BookOpen className="w-3.5 h-3.5 mr-2" />
                <span>{course.units.length} units</span>
              </div>
              <div className="flex items-center bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full transition-all duration-300 group-hover:bg-black/60">
                <Clock className="w-3.5 h-3.5 mr-2" />
                <span>{Math.round(estimatedTime / 60)} hours</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4 sm:p-6 flex items-center justify-between bg-gradient-to-r from-gray-50/50 via-white/80 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-800/80 dark:to-gray-900/50">
        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm">
          {totalChapters} chapters
        </div>
        
        <Link
          href={`/course/${course.id}/0/0`}
          className="inline-flex items-center group-hover:translate-x-1 transition-all duration-300 text-gray-800 dark:text-gray-200 font-medium text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-sm hover:shadow-md"
        >
          Start Learning
          <ChevronRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default GalleryCourseCard;