"use client";

import { cn } from '@/lib/utils'
import { Chapter, Courses, Unit } from '@prisma/client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Separator } from './ui/separator'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronDown, ChevronRight, Layers } from 'lucide-react'

type Props = {
  course: Courses & {
    units: (Unit & {
      chapters: Chapter[]
    })[]
  }
  currentChapterId: string
}

export const CourseSideBar = ({ course, currentChapterId }: Props) => {
  const [expandedUnits, setExpandedUnits] = useState<{ [key: string]: boolean }>(() => {
    // Initialize with all units expanded
    const expanded: { [key: string]: boolean } = {};
    course.units.forEach(unit => {
      // Check if any chapter in this unit is the current one
      const hasCurrentChapter = unit.chapters.some(chapter => chapter.id === currentChapterId);
      expanded[unit.id] = hasCurrentChapter;
    });
    return expanded;
  });

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  const containerVariants = {
    hidden: { x: -400, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const unitVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-[280px] sm:w-[320px] absolute top-12 bottom-3 bg-neutral-300 dark:bg-neutral-900 backdrop-filter backdrop-blur-md p-3 sm:p-4 md:p-6 overflow-y-auto shadow-xl border-r border-black/10 dark:border-white/10 transition-colors duration-300 rounded-xl"
    >
      {/* Course navigation */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center mb-3 sm:mb-4">
          <div className="w-5 h-5 sm:w-6 sm:h-6 mr-2 bg-black/10 dark:bg-white/10 rounded-md flex items-center justify-center">
            <Layers className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
          <h2 className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {course.name}
          </h2>
        </div>
      </div>

      {/* Units and chapters */}
      {course.units.map((unit, unitIndex) => (
        <motion.div
          key={unit.id}
          variants={unitVariants}
          className="mb-3 sm:mb-4 last:mb-0"
        >
          <button
            onClick={() => toggleUnit(unit.id)}
            className="w-full flex items-center justify-between py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200 group"
          >
            <div className="flex items-center">
              <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-md bg-black/10 dark:bg-white/10 text-xs font-medium mr-2 sm:mr-3">
                {unitIndex + 1}
              </span>
              <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
                {unit.name}
              </span>
            </div>
            {expandedUnits[unit.id] ? (
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200 transition-transform duration-200" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200 transition-transform duration-200" />
            )}
          </button>

          <AnimatePresence>
            {expandedUnits[unit.id] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="py-1.5 sm:py-2 pl-6 sm:pl-8 space-y-0.5 sm:space-y-1">
                  {unit.chapters.map((chapter, chapterIndex) => {
                    const isActive = chapter.id === currentChapterId;
                    
                    return (
                      <Link
                        key={chapter.id}
                        href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                      >
                        <motion.div
                          whileHover={{ x: 5 }}
                          className={cn(
                            "flex items-center py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg transition-all duration-200",
                            {
                              "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 shadow-sm": isActive,
                              "hover:bg-black/5 dark:hover:bg-white/5": !isActive,
                            }
                          )}
                        >
                          <div className={cn(
                            "w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center mr-2 sm:mr-3 transition-colors",
                            isActive ? "bg-blue-200 dark:bg-blue-800" : "bg-black/5 dark:bg-white/5"
                          )}>
                            <BookOpen className={cn(
                              "w-3 h-3 sm:w-3.5 sm:h-3.5",
                              isActive ? "text-blue-700 dark:text-blue-300" : "text-gray-500 dark:text-gray-400"
                            )} />
                          </div>
                          <span className={cn(
                            "text-xs sm:text-sm transition-colors",
                            isActive 
                              ? "font-medium text-blue-700 dark:text-blue-300" 
                              : "text-gray-700 dark:text-gray-300"
                          )}>
                            {chapter.name}
                          </span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
                <Separator className="my-2 sm:my-3 mx-2 bg-black/5 dark:bg-white/5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Course progress indicator */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-black/10 dark:border-white/10">
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Course Progress</span>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
            {(() => {
              // Calculate progress
              const totalChapters = course.units.reduce((sum, unit) => sum + unit.chapters.length, 0);
              // This is a placeholder - in a real implementation you'd track completed chapters
              const completedChapters = Math.floor(totalChapters * 0.3); // Example: 30% complete
              return `${completedChapters}/${totalChapters} chapters`;
            })()}
          </span>
        </div>
        <div className="w-full h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ width: '30%' }} // This would be dynamic based on actual progress
          ></div>
        </div>
      </div>
    </motion.div>
  )
}