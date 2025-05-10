/*

"use client";
import { Chapter, Courses, Unit } from "@prisma/client";
import React from "react";
import ChapterCard, { ChapterCardHandler } from "./ChapterCard";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  course: Courses & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

const ConfirmChapters = ({ course }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const chapterRefs: Record<string, React.RefObject<ChapterCardHandler>> = {};
  course.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      chapterRefs[chapter.id] = React.useRef(null);
    });
  });
  const [completedChapters, setCompletedChapters] = React.useState<Set<String>>(
    new Set()
  );
  const totalChaptersCount = React.useMemo(() => {
    return course.units.reduce((acc, unit) => {
      return acc + unit.chapters.length;
    }, 0);
  }, [course.units]);
  console.log(totalChaptersCount, completedChapters.size);
  return (
    <div className="w-full mt-4 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="mt-5">
            <h2 className="text-sm uppercase text-secondary-foreground/60">
              Unit {unitIndex + 1}
            </h2>
            <h3 className="text-2xl font-bold">{unit.name}</h3>
            <div className="mt-3">
              {unit.chapters.map((chapter, chapterIndex) => {
                return (
                  <ChapterCard
                    completedChapters={completedChapters}
                    setCompletedChapters={setCompletedChapters}
                    ref={chapterRefs[chapter.id]}
                    key={chapter.id}
                    chapter={chapter}
                    chapterIndex={chapterIndex}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="flex items-center justify-center mt-4">
        <Separator className="flex-[1]" />
        <div className="flex items-center mx-4">
          <Link
            href="/create"
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={4} />
            Back
          </Link>
          {totalChaptersCount === completedChapters.size ? (
            <Link
              className={buttonVariants({
                className: "ml-4 font-semibold",
              })}
              href={`/course/${course.id}/0/0`}
            >
              Save & Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          ) : (
            <Button
              type="button"
              className="ml-4  bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full py-3 font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                Object.values(chapterRefs).forEach((ref) => {
                  ref.current?.triggerLoad();
                });
              }}
            >
              Generate
              <ChevronRight className="w-4 h-4 ml-2" strokeWidth={4} />
            </Button>
          )}
        </div>
        <Separator className="flex-[1]" />
      </div>
    </div>
  );
};

export default ConfirmChapters;

*/

"use client";
import { Chapter, Courses, Unit } from "@prisma/client";
import React from "react";
import ChapterCard, { ChapterCardHandler } from "./ChapterCard";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  course: Courses & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const ConfirmChapters = ({ course }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const chapterRefs: Record<string, React.RefObject<ChapterCardHandler>> = {};
  course.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      chapterRefs[chapter.id] = React.useRef(null);
    });
  });
  const [completedChapters, setCompletedChapters] = React.useState<Set<String>>(
    new Set()
  );
  const totalChaptersCount = React.useMemo(() => {
    return course.units.reduce((acc, unit) => {
      return acc + unit.chapters.length;
    }, 0);
  }, [course.units]);

  const progress = React.useMemo(() => {
    return (completedChapters.size / totalChaptersCount) * 100;
  }, [completedChapters.size, totalChaptersCount]);
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full mt-4 bg-neutral-100 dark:bg-neutral-900 transition-colors duration-300 rounded-2xl shadow-lg overflow-hidden py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div variants={itemVariants} className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Course Chapters</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Review and generate content for each chapter. Once all chapters are complete, you can save and continue.
        </p>
        
        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto mt-6 bg-neutral-200 dark:bg-neutral-800 rounded-full h-4 overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-neutral-800 dark:to-neutral-200"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
          {completedChapters.size} of {totalChaptersCount} chapters completed
        </p>
      </motion.div>

      {course.units.map((unit, unitIndex) => {
        return (
          <motion.div 
            variants={itemVariants}
            key={unit.id} 
            className="mt-8 bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700 mr-3 text-sm font-medium">
                {unitIndex + 1}
              </div>
              <div>
                <h2 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                  Unit {unitIndex + 1}
                </h2>
                <h3 className="text-xl font-bold">{unit.name}</h3>
              </div>
            </div>
            
            <div className="space-y-4 mt-4">
              {unit.chapters.map((chapter, chapterIndex) => {
                return (
                  <ChapterCard
                    completedChapters={completedChapters}
                    setCompletedChapters={setCompletedChapters}
                    ref={chapterRefs[chapter.id]}
                    key={chapter.id}
                    chapter={chapter}
                    chapterIndex={chapterIndex}
                  />
                );
              })}
            </div>
          </motion.div>
        );
      })}
      
      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-center mt-10"
      >
        <Separator className="flex-[1]" />
        <div className="flex items-center gap-4 mx-4">
          <Link
            href="/create"
            className={buttonVariants({
              variant: "outline",
              className: "rounded-full px-6"
            })}
          >
            <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={2} />
            Back
          </Link>
          
          {totalChaptersCount === completedChapters.size ? (
            <Link
              className={buttonVariants({
                className: "bg-black dark:bg-white text-white dark:text-black rounded-full px-8 py-6 font-medium transition-all duration-200 hover:scale-105",
              })}
              href={`/course/${course.id}/0/0`}
            >
              Save & Continue
              <ChevronRight className="w-4 h-4 ml-2" strokeWidth={2} />
            </Link>
          ) : (
            <Button
              type="button"
              className="bg-black dark:bg-white text-white dark:text-black rounded-full px-8 py-6 font-medium hover:scale-105 transition-all duration-200"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                Object.values(chapterRefs).forEach((ref) => {
                  ref.current?.triggerLoad();
                });
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" strokeWidth={2} />
              Generate Chapters
              {loading && (
                <span className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white dark:border-black border-t-transparent"></span>
              )}
            </Button>
          )}
        </div>
        <Separator className="flex-[1]" />
      </motion.div>
    </motion.div>
  );
};

export default ConfirmChapters;