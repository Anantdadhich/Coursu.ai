/*
import ConfirmChapters from "@/components/ConfirmChapters";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Info } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    courseId: string;
  };
};

const CreateChapters = async ({ params: { courseId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/gallery");
  }
  const course = await prisma.courses.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  if (!course) {
    return redirect("/create");
  }
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h5 className="text-sm uppercase text-gray-500 mb-2">Course Name</h5>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{course.name}</h1>

        <div className="flex items-start p-4 bg-blue-50 rounded-md mb-8">
          <Info className="w-6 h-6 mr-4 text-blue-500 flex-shrink-0 mt-1" />
         <p className="text-sm text-blue-700">
  We've generated chapters for each of your units. Please review them
  and click the button below to confirm and continue.
</p>

        </div>

        <ConfirmChapters course={course} />
      </div>
    </div>
  );
};

export default CreateChapters;*/
import ConfirmChapters from "@/components/ConfirmChapters";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Info, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    courseId: string;
  };
};

const CreateChapters = async ({ params: { courseId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/gallery");
  }
  const course = await prisma.courses.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });
  if (!course) {
    return redirect("/create");
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-16 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center space-x-2 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 backdrop-filter backdrop-blur-lg shadow-sm border rounded-full px-4 py-2 mb-4">
            <div className="flex items-center justify-center h-5 w-5 bg-black/10 dark:bg-white/10 rounded-full">
              <Sparkles className="h-3 w-3" />
            </div>
            <span className="text-sm font-medium">Course Creator</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">{course.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Review and customize your course chapters before finalizing your course structure.
          </p>
        </div>

        <div className="flex items-start p-6 bg-white/60 dark:bg-black/60 border border-black/10 dark:border-white/10 backdrop-filter backdrop-blur-md rounded-xl shadow-sm mb-8 max-w-3xl mx-auto">
          <Info className="w-6 h-6 mr-4 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-1" />
          <p className="text-gray-700 dark:text-gray-300">
            We've generated chapters for each of your units. Please review them
            and click the generate button to create content for each chapter, or confirm and continue if you're satisfied.
          </p>
        </div>

        <ConfirmChapters course={course} />
      </div>
    </div>
  );
};

export default CreateChapters;
