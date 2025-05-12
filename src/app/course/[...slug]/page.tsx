/*import { CourseSideBar } from '@/components/CourseSideBar'
import { MainVideoSummary } from '@/components/MainVediSummary'
import QuizCards from '@/components/QuizCard'
import { prisma } from '@/lib/db'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  params: {
    slug: string[]
  }
}

const Page = async ({ params: { slug } }: Props) => {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;

  const course = await prisma.courses.findUnique({
    where: { id: courseId },
    include: {
      units: {
        include: {
          chapters: {
            include: { questions: true }
          }
        }
      }
    }
  })

  if (!course) {
    return redirect("/")
  }

  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);

  const unit = course.units[unitIndex];
  if (!unit) {
    return redirect("/gallery");
  }
  const chapter = unit.chapters[chapterIndex];
  if (!chapter) {
    return redirect("/gallery");
  }
  const nextChapter = unit.chapters[chapterIndex + 1];
  const prevChapter = unit.chapters[chapterIndex - 1];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-[300px] lg:w-[400px]">
        <CourseSideBar course={course} currentChapterId={chapter.id} />
      </div>
      <div className="flex-1 p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <MainVideoSummary
            chapter={chapter}
            chapterIndex={chapterIndex}
            unit={unit}
            unitIndex={unitIndex}
          />
          <QuizCards chapter={chapter} />
        </div>

        <div className="h-[1px] mt-4 bg-gray-500" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4">
          {prevChapter && (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
              className="flex items-center"
            >
              <ChevronLeft className="w-6 h-6 mr-1" />
              <div className="flex flex-col items-start">
                <span className="text-sm text-secondary-foreground/60">
                  Previous
                </span>
                <span className="text-xl font-bold">
                  {prevChapter.name}
                </span>
              </div>
            </Link>
          )}

          {nextChapter && (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
              className="flex items-center"
            >
              <div className="flex flex-col items-end">
                <span className="text-sm text-secondary-foreground/60">
                  Next
                </span>
                <span className="text-xl font-bold">
                  {nextChapter.name}
                </span>
              </div>
              <ChevronRight className="w-6 h-6 ml-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page

*/

import { CourseSideBar } from '@/components/CourseSideBar'
import { MainVideoSummary } from '@/components/MainVediSummary'
import QuizCards from '@/components/QuizCard'
import { prisma } from '@/lib/db'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  params: {
    slug: string[]
  }
}

const CoursePage = async ({ params: { slug } }: Props) => {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;

  const course = await prisma.courses.findUnique({
    where: { id: courseId },
    include: {
      units: {
        include: {
          chapters: {
            include: { questions: true }
          }
        }
      }
    }
  })

  if (!course) {
    return redirect("/")
  }

  let unitIndex = parseInt(unitIndexParam);
  let chapterIndex = parseInt(chapterIndexParam);

  const unit = course.units[unitIndex];
  if (!unit) {
    return redirect("/gallery");
  }
  const chapter = unit.chapters[chapterIndex];
  if (!chapter) {
    return redirect("/gallery");
  }
  const nextChapter = unit.chapters[chapterIndex + 1];
  const prevChapter = unit.chapters[chapterIndex - 1];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral-300 dark:bg-neutral-900 text-black dark:text-white ">
    
      <div className="w-full md:w-[300px] lg:w-[400px] border-r border-gray-200 dark:border-gray-800 p-10 top-12">
        <CourseSideBar course={course} currentChapterId={chapter.id} />
      </div>
      
  
      <div className="flex-1 p-8 md:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <MainVideoSummary
            chapter={chapter}
            chapterIndex={chapterIndex}
            unit={unit}
            unitIndex={unitIndex}
          />
          <QuizCards chapter={chapter} />
        </div>

        <div className="h-px mt-8 mb-8 bg-gray-200 dark:bg-gray-800" />
        
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {prevChapter ? (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
              className="flex items-center group p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
            >
              <div className="flex items-center">
                <ChevronLeft className="w-6 h-6 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                <div className="flex flex-col items-start">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Previous Chapter
                  </span>
                  <span className="text-lg font-bold truncate max-w-[250px]">
                    {prevChapter.name}
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}

          {nextChapter ? (
            <Link
              href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
              className="flex items-center group p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
            >
              <div className="flex items-center">
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Next Chapter
                  </span>
                  <span className="text-lg font-bold truncate max-w-[250px]">
                    {nextChapter.name}
                  </span>
                </div>
                <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          ) : (
            <div className="flex-1"></div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoursePage

