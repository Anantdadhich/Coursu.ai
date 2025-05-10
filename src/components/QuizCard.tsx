"use client";
import { cn } from "@/lib/utils";
import { Chapter, Question } from "@prisma/client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

type Props = {
  chapter: Chapter & {
    questions: Question[];
  };
};

const QuizCards = ({ chapter }: Props) => {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [questionState, setQuestionState] = React.useState<
    Record<string, boolean | null>
  >({});
  const checkAnswer = React.useCallback(() => {
    const newQuestionState = { ...questionState };
    chapter.questions.forEach((question) => {
      const user_answer = answers[question.id];
      if (!user_answer) return;
      if (user_answer === question.answer) {
        newQuestionState[question.id] = true;
      } else {
        newQuestionState[question.id] = false;
      }
      setQuestionState(newQuestionState);
    });
  }, [answers, questionState, chapter.questions]);
  return (
   <div className="flex-[1] mt-8 sm:mt-12 md:mt-16 mx-4 sm:mx-6 md:ml-8 rounded-lg shadow-xl p-4 sm:p-5 md:p-6 overflow-y-auto bg-neutral-300 dark:bg-neutral-900">
    <h1 className="text-xl sm:text-2xl mb-4 sm:mb-6 text-gray-800 dark:text-white font-italic">Concept Check</h1>
    <div className="mt-2 text-gray-800 dark:text-gray-200">
      {chapter.questions.map((question) => {
        const options = JSON.parse(question.options) as string[];
        return (
          <div
            key={question.id}
            className={cn("p-3 sm:p-4 mt-3 sm:mt-4 border border-gray-200 dark:border-gray-700 rounded-lg", {
              "bg-green-100 dark:bg-green-800": questionState[question.id] === true,
              "bg-red-100 dark:bg-red-800": questionState[question.id] === false,
              "bg-gray-100 dark:bg-gray-800": questionState[question.id] === null,
            })}
          >
            <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">{question.question}</h1>
            <div className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <RadioGroup
                onValueChange={(e) => {
                  setAnswers((prev) => {
                    return {
                      ...prev,
                      [question.id]: e,
                    };
                  });
                }}
              >
                {options.map((option, index) => {
                  return (
                    <div className="flex items-center space-x-2 py-1 sm:py-1.5" key={index}>
                      <RadioGroupItem
                        value={option}
                        id={question.id + index.toString()}
                      />
                      <Label htmlFor={question.id + index.toString()} className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        {option}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          </div>
        );
      })}
    </div>
    <Button className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-gray-700 to-gray-400 text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg hover:from-gray-600 hover:to-neutral-800 transition-all duration-200 shadow-lg" size="lg" onClick={checkAnswer}>
      Check Answer
      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
    </Button>
  </div>
  );
};

export default QuizCards;