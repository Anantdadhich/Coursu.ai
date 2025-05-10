"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import { Rocket, Plane, MapPin, DollarSign } from "lucide-react";

export const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.scrollHeight);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const steps = [
    {
      id: "01",
      title: "AI Course Creation",
      description:
        "This is where Coursu really shines. Tons of content doesn't have to equal tons of work; our AI can generate tons of course materials! AI-powered courses are where the best learning experiences on Coursu are found.",
    },
    {
      id: "02",
      title: "Personalized Learning",
      description:
        "Unlike traditional courses which have already structured their content down to a fixed path, our AI-generated courses have personalization that adapts to your learning style and pace. We customize everything for you.",
    },
    {
      id: "03",
      title: "Interactive Elements",
      description:
        "Coursu has tons of interactive elements and tons of engagement features. Standard courses are not so engaging. Interactive elements mean better retention. Plus, they typically provide immediate feedback which boosts learning.",
    },
    {
      id: "04",
      title: "Track Your Progress",
      description:
        "Unlike traditional learning platforms which have already structured progress tracking, our AI-powered analytics provide deep insights into your learning patterns and improvements over time. We help you stay on track.",
    },
  ];

  return (
    <motion.section
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full py-24 bg-white text-black dark:bg-black dark:text-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            HOW IT WORKS?
          </h2>
        </motion.div>

        <div className="relative">
          {/* Static Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-black/10 dark:bg-white/10 transition-colors duration-300" />

          {/* Animated Scroll Line */}
          <motion.div
            style={{ height: heightTransform }}
            className="absolute left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-transparent rounded-full"
          />

          {/* Steps */}
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className={`flex flex-col ${
                index % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              } items-center mb-24 last:mb-0 relative`}
            >
              {/* Step Number */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10 w-16 h-16 rounded-full bg-white dark:bg-black flex items-center justify-center border border-black/10 dark:border-white/10 shadow-md transition-colors duration-300">
                <span className="font-bold text-lg">{step.id}</span>
              </div>

              {/* Content */}
              <div
                className={`w-full md:w-1/2 ${
                  index % 2 === 0
                    ? "md:pr-12 md:text-right"
                    : "md:pl-12"
                } mt-16 md:mt-0`}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
