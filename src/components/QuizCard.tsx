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
    <div className="flex-[1] mt-6 sm:mt-8 mx-2 sm:mx-4 rounded-xl shadow-lg p-4 sm:p-5 overflow-y-auto bg-neutral-300 dark:bg-neutral-900 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
          Concept Check
        </h1>
      </div>
      
      <div className="space-y-4">
        {chapter.questions.map((question) => {
          const options = JSON.parse(question.options) as string[];
          return (
            <div
              key={question.id}
              className={cn(
                "p-4 sm:p-5 border rounded-xl transition-all duration-200",
                {
                  "border-green-500 bg-green-50/50 dark:bg-green-900/20": 
                    questionState[question.id] === true,
                  "border-red-500 bg-red-50/50 dark:bg-red-900/20": 
                    questionState[question.id] === false,
                  "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50": 
                    questionState[question.id] === null,
                }
              )}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                {question.question}
              </h2>
              
              <RadioGroup
                onValueChange={(e) => {
                  setAnswers((prev) => ({
                    ...prev,
                    [question.id]: e,
                  }));
                }}
                className="space-y-3"
              >
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <RadioGroupItem
                      value={option}
                      id={question.id + index.toString()}
                      className="h-5 w-5 text-indigo-600 dark:text-indigo-400 border-2 border-black dark:border-gray-600"
                    />
                    <Label
                      htmlFor={question.id + index.toString()}
                      className="text-sm sm:text-base text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          );
        })}
      </div>

      <Button
        className="w-full mt-6  text-white dark:text-black bg-gray-900 dark:bg-gray-100 rounded-xl px-6 py-3 font-semibold text-base  transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
        size="lg"
        onClick={checkAnswer}
      >
        Check Answer
        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default QuizCards;