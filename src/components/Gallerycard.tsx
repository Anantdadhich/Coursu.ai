/*import { Chapter, Courses, Unit } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Clock, BookOpen } from "lucide-react"; // Assuming you're using lucide-react for icons

type Props = {
  course: Courses & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

const GalleryCourseCard = ({ course }: Props) => {
  const totalChapters = course.units.reduce((acc, unit) => acc + unit.chapters.length, 0);
  const estimatedTime = totalChapters * 30; // Assuming 30 minutes per chapter

  return (
    <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <Link href={`/course/${course.id}/0/0`} className="block">
        <div className="relative">
          <Image
            src={course.image || "/default-image.jpg"}
            className="object-cover w-full h-56 transition-transform duration-300"
            width={400}
            height={224}
            alt={`Cover for ${course.name}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <h3 className="text-white text-2xl font-bold truncate mb-2">{course.name}</h3>
            <div className="flex items-center text-white/80 text-sm">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{course.units.length} units</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              <span>{Math.round(estimatedTime / 60)} hours</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="p-6">
        
        <Link
          href={`/course/${course.id}/0/0`}
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-6 py-2 text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md"
        >
          Start Learning
        </Link>
      </div>
    </div>
  );
};

export default GalleryCourseCard;
*/

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
  const estimatedTime = totalChapters * 30; // Assuming 30 minutes per chapter

  return (
    <div className="group relative bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <Link href={`/course/${course.id}/0/0`} className="block">
        <div className="relative">
          <Image
            src={course.image || "/default-image.jpg"}
            className="object-cover w-full h-48 sm:h-56 transition-transform duration-500 group-hover:scale-105"
            width={400}
            height={224}
            alt={`Cover for ${course.name}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
            <h3 className="text-white text-lg sm:text-xl font-bold mb-2 line-clamp-2">{course.name}</h3>
            <div className="flex items-center text-white/80 text-xs sm:text-sm space-x-3 sm:space-x-4">
              <div className="flex items-center">
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                <span>{course.units.length} units</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                <span>{Math.round(estimatedTime / 60)} hours</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4 sm:p-6 flex items-center justify-between">
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {totalChapters} chapters
        </div>
        
        <Link
          href={`/course/${course.id}/0/0`}
          className="inline-flex items-center group-hover:translate-x-1 transition-transform duration-300 text-black dark:text-white font-medium text-xs sm:text-sm"
        >
          Start Learning
          <ChevronRight className="ml-1 w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>
      </div>
    </div>
  );
};

export default GalleryCourseCard;