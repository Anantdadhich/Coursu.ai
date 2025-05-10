import React from "react";
import { prisma } from "@/lib/db";
import GalleryCourseCard from "@/components/Gallerycard";
import { Particles } from "@/components/ui/Backgroundbeams";

const GalleryPage = async () => {
  const courses = await prisma.courses.findMany({
    include: {
      units: {
        include: { chapters: true },
      },
    },
  });
  

  return (
    <div className="min-h-screen bg-neutral-300 dark:bg-neutral-900 text-black dark:text-white transition-colors duration-300 p-12">
       <Particles  className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        size={1}
        
        refresh/>
      <div className="py-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
            Discover <span className="text-black dark:text-white">Courses</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Expand your knowledge with AI-generated courses designed to accelerate your learning journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <GalleryCourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;