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
    <div className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/course/${course.id}/0/0`} className="block">
        <div className="relative">
          <Image
            src={course.image || "/default-image.jpg"}
            className="object-cover w-full h-48 sm:h-56 transition-transform duration-500 group-hover:scale-105"
            width={400}
            height={224}
            alt={`Cover for ${course.name}`}
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-2 line-clamp-2 drop-shadow-lg">
              {course.name}
            </h3>
            <div className="flex items-center text-white/90 text-sm space-x-4">
              <div className="flex items-center bg-black/30 px-2 py-1 rounded-lg backdrop-blur-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>{course.units.length} units</span>
              </div>
              <div className="flex items-center bg-black/30 px-2 py-1 rounded-lg backdrop-blur-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>{Math.round(estimatedTime / 60)} hours</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4 sm:p-6 flex items-center justify-between bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-gray-800/50">
        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium px-2 py-1 rounded-md bg-gray-100/50 dark:bg-gray-800/50">
          {totalChapters} chapters
        </div>
        
        <Link
          href={`/course/${course.id}/0/0`}
          className="inline-flex items-center group-hover:translate-x-1 transition-all duration-300 text-gray-800 dark:text-gray-300 font-medium text-sm "
        >
          Start Learning
          <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default GalleryCourseCard;