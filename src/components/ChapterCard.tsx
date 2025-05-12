/*"use client"
import { Chapter } from '@prisma/client'
import React from 'react'
import { useToast } from './ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type Props={
    chapter:Chapter,
    chapterIndex:number,
    completedChapters:Set<String>,
    setCompletedChapters:React.Dispatch<React.SetStateAction<Set<String>>>
 
}

export type ChapterCardHandler={
    triggerLoad:()=>void
}

export const ChapterCard =React.forwardRef<ChapterCardHandler,Props> (({chapter,chapterIndex,setCompletedChapters,completedChapters},ref) => {
    const {toast}=useToast(); 
    const [success,setSuccess]=React.useState<boolean |null>(null);
          //@ts-ignore
     const {mutate:getChapterInfo,isLoading}=useMutation({
      mutationFn:async()=>{
        const response=await axios.post("/api/chapter/getInfo",{
          chapterId:chapter.id
        })
        return response.data;
      }
     })

     const addChapterToSet=React.useCallback(()=>{
      setCompletedChapters((prev)=>{
        const newSet=new Set(prev);
        newSet.add(chapter.id);
        return newSet;
      })
     },[chapter.id,setCompletedChapters])

     React.useEffect(()=>{
      if(chapter.videoId){
        setSuccess(true);
        addChapterToSet
      }
     },[chapter,addChapterToSet]);

     React.useImperativeHandle(ref,()=>({
      async triggerLoad(){
        if(chapter.videoId){
         addChapterToSet();
         return ;
        }
           getChapterInfo(undefined, {
          onSuccess: () => {
            setSuccess(true);
            addChapterToSet();
          },
          onError: (error) => {
            console.error(error);
            setSuccess(false);
            toast({
              title: "Error",
              description: "There was an error loading your chapter",
              variant: "destructive",
            });
            addChapterToSet();
          },
        });
      }
     }))
    
  return (
    <div key={chapter.id} className={cn("px-4 rounded flex justify-between py-2 mt-2",{
      "bg-secondary" :success ===null ,
      "bg-red-500":success===false,
      "bg-green-500":success===true
    })}>
        <h5>{chapter.name}</h5>
        {isLoading && <Loader2 className='animate-spin' ></Loader2>}
    </div> 
  )
}

)    */
"use client";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

type Props = {
  chapter: Chapter;
  chapterIndex: number;
  completedChapters: Set<String>;
  setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
};

export type ChapterCardHandler = {
  triggerLoad: () => void;
};

const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(
  ({ chapter, chapterIndex, setCompletedChapters, completedChapters }, ref) => {
    const { toast } = useToast();
    const [success, setSuccess] = React.useState<boolean | null>(null);
    //@ts-ignore
    const { mutate: getChapterInfo, isLoading } = useMutation({
      mutationFn: async () => {
        const response = await axios.post("/api/chapter/getInfo", {
          chapterId: chapter.id,
        });
        return response.data;
      },
    });

    const addChapterIdToSet = React.useCallback(() => {
      setCompletedChapters((prev) => {
        const newSet = new Set(prev);
        newSet.add(chapter.id);
        return newSet;
      });
    }, [chapter.id, setCompletedChapters]);

    React.useEffect(() => {
      if (chapter.videoId) {
        setSuccess(true);
        addChapterIdToSet;
      }
    }, [chapter, addChapterIdToSet]);

    React.useImperativeHandle(ref, () => ({
      async triggerLoad() {
        if (chapter.videoId) {
          addChapterIdToSet();
          return;
        }
        getChapterInfo(undefined, {
          onSuccess: () => {
            setSuccess(true);
            addChapterIdToSet();
          },
          onError: (error) => {
            console.error(error);
            setSuccess(false);
            toast({
              title: "Error",
              description: "There was an error loading your chapter",
              variant: "destructive",
            });
            addChapterIdToSet();
          },
        });
      },
    }));
    return (
      <div
      key={chapter.id}
      className={cn(
        "w-full px-4 py-3 mt-2 rounded-xl border shadow-sm flex items-center justify-between transition-colors",
        {
          "bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700": success === null,
          "bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800": success === false,
          "bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800": success === true,
        }
      )}
    >
      <h5 className="text-sm font-medium text-black dark:text-white">{chapter.name}</h5>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-black dark:text-white" />}
    </div>
    );
  }
);

ChapterCard.displayName = "ChapterCard";

export default ChapterCard;
