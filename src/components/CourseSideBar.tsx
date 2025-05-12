"use client";

import { cn } from '@/lib/utils'
import { Chapter, Courses, Unit } from '@prisma/client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Separator } from './ui/separator'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronDown, ChevronRight, Layers, Menu, X } from 'lucide-react'

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
    const expanded: { [key: string]: boolean } = {};
    course.units.forEach(unit => {
      const hasCurrentChapter = unit.chapters.some(chapter => chapter.id === currentChapterId);
      expanded[unit.id] = hasCurrentChapter;
    });
    return expanded;
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleUnit = (unitId: string) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  const containerVariants = {
    hidden: { x: -400, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: -400, opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <>
      {/* Mobile menu toggle */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="bg-neutral-200 dark:bg-neutral-800 p-2 rounded-md"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="fixed top-0 left-0 z-40 w-4/5 max-w-xs h-full bg-neutral-300 dark:bg-neutral-900 p-4 overflow-y-auto border-r border-black/10 dark:border-white/10"
            >
              <div className="flex justify-end mb-4">
                <button onClick={() => setMobileOpen(false)} className="text-gray-600 dark:text-gray-300">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Reuse sidebar below */}
              {renderSidebar()}
            </motion.div>
            <div
              className="fixed inset-0 z-30 bg-black/30 dark:bg-black/50 sm:hidden"
              onClick={() => setMobileOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden sm:block fixed top-0 left-0 w-full sm:max-w-[320px] md:max-w-[300px] lg:max-w-[400px] h-screen bg-neutral-300 dark:bg-neutral-900 sm:p-4 md:p-6 overflow-y-auto border-r border-black/10 dark:border-white/10 transition-colors duration-300 rounded-none">
        {renderSidebar()}
      </div>
    </>
  )

  function renderSidebar() {
    return (
      <>
        <div className="mt-20 mb-4 sm:mb-6">
          <div className="flex items-center mb-3 sm:mb-4 ">
            <div className="w-5 h-5 sm:w-6 sm:h-6 mr-2 bg-black/10 dark:bg-white/10 rounded-md flex items-center justify-center">
              <Layers className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <h2 className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 ">
              {course.name}
            </h2>
          </div>
        </div>

        {course.units.map((unit, unitIndex) => (
          <div key={unit.id} className="mb-3 sm:mb-4 last:mb-0">
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
                                "bg-gray-100 dark:bg-gray-800 text-black dark:text-white shadow-sm": isActive,
                                "hover:bg-black/5 dark:hover:bg-white/5": !isActive,
                              }
                            )}
                          >
                            <div
                              className={cn(
                                "w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center mr-2 sm:mr-3 transition-colors",
                                isActive ? "bg-gray-300 dark:bg-gray-700" : "bg-black/5 dark:bg-white/5"
                              )}
                            >
                              <BookOpen
                                className={cn(
                                  "w-3 h-3 sm:w-3.5 sm:h-3.5",
                                  isActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                                )}
                              />
                            </div>
                            <span
                              className={cn(
                                "text-xs sm:text-sm transition-colors",
                                isActive
                                  ? "font-medium text-black dark:text-white"
                                  : "text-gray-800 dark:text-gray-300"
                              )}
                            >
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
          </div>
        ))}

       
      </>
    )
  }
}
