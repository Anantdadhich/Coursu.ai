/*"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { CreatCourseChapterSchema } from "@/validators/course";




type Input = z.infer<typeof CreatCourseChapterSchema>;

export const CreateCourseForm = () => {
  const router = useRouter();
  const { toast } = useToast();
    //@ts-ignore
  const { mutate: createChapters, isLoading } = useMutation({
    mutationFn: async ({ title, units }: Input) => {
      const response = await axios.post("/api/course/createChapters", {
        title,
        units,
      });
      return response.data;
    },
  });
  const form = useForm<Input>({
    resolver: zodResolver(CreatCourseChapterSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  function onSubmit(data: Input) {
    if (data.units.some((unit) => unit === "")) {
      toast({
        title: "Error",
        description: "Please fill all the units",
        variant: "destructive",
      });
      return;
    }
    createChapters(data, {
      onSuccess: ({ course_id }) => {
        toast({
          title: "Success",
          description: "Course created successfully",
        });
        router.push(`/create/${course_id}`);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });
  }

  form.watch();

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                  <FormLabel className="flex-[1] text-xl">Title</FormLabel>
                  <FormControl className="flex-[6]">
                    <Input
                      placeholder="Enter the main topic of the course"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <AnimatePresence>
            {form.watch("units").map((_, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    height: { duration: 0.2 },
                  }}
                >
                  <FormField
                    key={index}
                    control={form.control}
                    name={`units.${index}`}
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                          <FormLabel className="flex-[1] text-xl">
                            Unit {index + 1}
                          </FormLabel>
                          <FormControl className="flex-[6]">
                            <Input
                              placeholder="Enter subtopic of the course"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="flex items-center justify-center mt-4">
            <Separator className="flex-[1]" />
            <div className="mx-4">
              <Button
                type="button"
                variant="secondary"
                className="font-semibold"
                onClick={() => {
                  form.setValue("units", [...form.watch("units"), ""]);
                }}
              >
                Add Unit
                <Plus className="w-4 h-4 ml-2 text-green-500" />
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="font-semibold ml-2"
                onClick={() => {
                  form.setValue("units", form.watch("units").slice(0, -1));
                }}
              >
                Remove Unit
                <Trash className="w-4 h-4 ml-2 text-red-500" />
              </Button>
            </div>
            <Separator className="flex-[1]" />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full mt-6"
            size="lg"
          >
            Lets Go!
          </Button>
        </form>
      </Form>
    
    </div>
  );
};
*/
"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { CreatCourseChapterSchema} from "@/validators/course";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Plus, Sparkles, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { SubscriptionActionCard } from "./SubscriptionActionCard";

type Props = { isPro: boolean };

type Input = z.infer<typeof CreatCourseChapterSchema>;

const CreateCourseForm = ({isPro}:Props) => {
  const router = useRouter();
  const { toast } = useToast();
  //@ts-ignore
  const { mutate: createChapters, isLoading } = useMutation({
    mutationFn: async ({ title, units }: Input) => {
      const response = await axios.post("/api/course/createChapters", {
        title,
        units,
      });
      return response.data;
    },
  });
  const form = useForm<Input>({
    resolver: zodResolver(CreatCourseChapterSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  function onSubmit(data: Input) {
    if (data.units.some((unit) => unit === "")) {
      toast({
        title: "Error",
        description: "Please fill all the units",
        variant: "destructive",
      });
      return;
    }
    createChapters(data, {
      onSuccess: ({ course_id }) => {
        toast({
          title: "Success",
          description: "Course created successfully",
        });
        router.push(`/create/${course_id}`);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });
  }

  form.watch();

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
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
    initial="hidden"
    animate="visible"
    variants={containerVariants}
    className="w-full"
  >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold">Course Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the main topic of the course"
                    {...field}
                    className="mt-2 h-12 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </motion.div>

        <div className="my-8">
          <motion.div 
            variants={itemVariants}
            className="flex items-center mb-6"
          >
            <div className="w-10 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-3"></div>
            <h3 className="text-lg font-medium">Course Units</h3>
          </motion.div>

          <AnimatePresence>
            {form.watch("units").map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <FormField
                  control={form.control}
                  name={`units.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center mr-2 text-sm font-medium">
                          {index + 1}
                        </div>
                        <FormLabel className="text-lg">Unit {index + 1}</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Enter subtopic of the course"
                          {...field}
                          className="mt-1 h-12 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <Button
            type="button"
            onClick={() => form.setValue("units", [...form.watch("units"), ""])}
            className="relative group overflow-hidden bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white rounded-xl px-6 py-3 font-medium transition-all duration-200 border border-black/10 dark:border-white/10 backdrop-filter backdrop-blur-lg flex items-center"
          >
            <Plus className="w-5 h-5 mr-2 text-purple-500" />
            Add Unit
          </Button>
          
          <Button
            type="button"
            onClick={() => {
              if (form.watch("units").length > 1) {
                form.setValue("units", form.watch("units").slice(0, -1));
              }
            }}
            className="relative group overflow-hidden bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white rounded-xl px-6 py-3 font-medium transition-all duration-200 border border-black/10 dark:border-white/10 backdrop-filter backdrop-blur-lg flex items-center"
            disabled={form.watch("units").length <= 1}
          >
            <Trash className="w-5 h-5 mr-2 text-red-500" />
            Remove Unit
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-4">
          <div className="relative group mt-8">
            <div className="absolute -inset-1  rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Button
              disabled={isLoading}
              type="submit"
              className="relative w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full py-6 font-semibold text-lg transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? 'Creating...' : 'Generate AI Course'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </form>
    </Form>
    
    {!isPro && (
      <motion.div 
        variants={itemVariants}
        className="mt-10"
      >
        <SubscriptionActionCard />
      </motion.div>
    )}
  </motion.div>
  );
};

export default CreateCourseForm;