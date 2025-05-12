"use client";




import AvatarCircles from "@/components/AvatarCircles";
import {  Particles } from "@/components/ui/Backgroundbeams";
import { LineShadowText } from "@/components/ui/Lineshadowtext";
import { ShineBorder } from "@/components/ui/shineborder";
import { UserCountDisplay } from "@/components/UserCountDisplay";


import { motion, AnimatePresence, useTransform, useScroll } from "framer-motion";
import { Brain, ChartLine, ChevronRight, Rocket, ArrowRight, Check, Sparkles, PenSquare, BrainCircuit, ListChecks} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";


export default function Home() {
  const router = useRouter();
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  
  const { resolvedTheme } = useTheme();

  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "/",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "/",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "/",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "/",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "/",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/89768406",
      profileUrl: "/",
    },
  ];
   
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  // Features list with more detailed content
  const features = [
    {
      id: 1,
      icon: <Rocket />,
      title: "Auto Course Builder",
      description:
        "Type a course topic and chapters you want to cover, and let our AI do the heavy lifting — it fetches the best YouTube videos course, summarizes of videos, and assembles a full course for you in minutes.",
      linkText: "Try it now",
      href: "/",
      stats: "10x faster course creation"
    },
    {
      id: 2,
      icon: <Brain />,
      title: "Gemini AI-Powered Learning",
      description:
        "Coursu leverages Google's Gemini AI to analyze YouTube videos, distill key ideas, and turn them into personalized lessons with best videos, insightful summaries, and smart quizzes.",
      linkText: "See how it works",
      href: "/",
      stats: "5x more learner engagement"
    },
    {
      id: 3,
      icon: <ChartLine />,
      title: "Interactive Quizzes",
      description:
        "Every video is paired with AI-generated quizzes with specific youtube video. Learners get instant feedback — making it fun, effective, and memorable.",
      linkText: "Explore features",
      href: "/",
      stats: "92% better knowledge retention"
    }
  ];
  
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

  const containerVariantss = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariantss = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  
const steps = [
  {
    id: "01",
    title: "Enter Course Title & Chapters",
    description: "Start by giving your course a name and a units you want to cover. This helps define what your course is about and sets the foundation for the content generation process.",
    icon: <PenSquare className="w-8 h-8" />
  },
  {
    id: "02",
    title: "AI-Powered Course Generation",
    description: "Coursu.ai uses Gemini AI to generate course materials from YouTube videos. Just provide a video link, and we'll summarize it, extract key topics, and create structured lessons.",
    icon: <BrainCircuit className="w-8 h-8" />
  },
  {
    id: "03",
    title: "Auto-Generated Quizzes",
    description: "Based on the video content, Coursu creates interactive quizzes to reinforce your learning experience. These questions are tailored to test the key concepts covered in the video.",
    icon: <ListChecks className="w-8 h-8" />
  },
  {
    id: "04",
    title: "Course Ready to Publish",
    description: "Once your content and quizzes are ready, your course is fully prepared for publishing. Share it with learners and start helping others gain skills—powered by AI.",
    icon: <Rocket className="w-8 h-8" />
  },
];


  return (
    <div className="relative min-h-screen w-full bg-neutral-300 text-gray-800 dark:bg-neutral-900 dark:text-white transition-colors duration-300 p-4 sm:p-8 md:p-16">
       
       <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        size={1.5}
        ease={80}
        color={color}
      
        refresh
      />
    <div className="hidden sm:flex absolute top-28 inset-x-0 justify-center z-30">
  <motion.div 
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.7, type: "spring" }}
    className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 backdrop-filter backdrop-blur-lg shadow-xl border rounded-full px-6 py-4 flex items-center space-x-2 transition-colors duration-300"
  >
    <div className="flex items-center justify-center h-5 w-5 bg-black/10 dark:bg-white/10 rounded-full transition-colors duration-300">
      <Sparkles className="h-3 w-3" />
    </div>
    <span className="text-sm font-medium">Join interactive Learning</span>
    <motion.div
      animate={{ x: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}
    >
      <ChevronRight className="h-4 w-4" />
    </motion.div>
  </motion.div>
</div>

      
      <div className="relative z-10 flex items-center justify-center min-h-screen w-full px-4 sm:px-6 pt-20 sm:pt-28 pb-12 sm:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center max-w-7xl w-full"
        >
          {/* Hero Section */}
          
          <div className="w-full flex flex-col items-center justify-center mb-16">
             
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center mb-4 sm:mb-6"
            >   
              AI-Powered Course Generator<br />with Summaries and <LineShadowText shadowColor={shadowColor}> Quizzes</LineShadowText>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="font-normal text-lg sm:text-xl md:text-2xl pb-6 sm:pb-10 text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 px-4"
            >
              Transform your learning experience with Coursu: AI-generated courses tailored just for you.
            </motion.p>
            
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row gap-4 px-4 sm:px-0"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/create")}
                className="relative group overflow-hidden bg-black dark:bg-white text-white dark:text-black  rounded-full px-8 py-4 font-medium text-lg transition-all duration-200 shadow-lg  border-black/10 dark:border-white/10 backdrop-filter backdrop-blur-lg  border "
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get started
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={()=>router.push("/gallery")}
                className="bg-transparent text-black dark:text-white border-black/20 dark:border-white/20 border rounded-full px-8 py-4 font-medium text-lg transition-all duration-200 flex items-center"
              >
                Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>

            
            </motion.div>
            <div className="mt-6 flex flex-col items-center justify-center space-y-2">
      <AvatarCircles></AvatarCircles>
  <UserCountDisplay />
</div>


          </div>
          
      
       
          <motion.div 
  variants={itemVariants}
  className="w-full max-w-5xl mx-auto mb-16 sm:mb-24 relative px-4 sm:px-0"
>

  <div className="absolute inset-0 z-30 pointer-events-none rounded-3xl">
    <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
  </div>

 
  <div className="absolute -inset-1 bg-black/10 dark:bg-white/10 rounded-3xl blur opacity-30 z-10"></div>


  <div className="relative z-20 bg-white/60 dark:bg-black/60 border border-black/10 dark:border-white/10 backdrop-filter backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl transition-colors duration-300">
    
   
    <div className="h-12 bg-neutral-200 dark:bg-neutral-800 border-b border-black/10 dark:border-white/10 flex items-center px-4 transition-colors duration-300">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-gray-400 rounded-full" />
        <div className="w-3 h-3 bg-gray-400 rounded-full" />
        <div className="w-3 h-3 bg-gray-400 rounded-full" />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 bg-gray-200/70 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-md px-4 py-0.5 text-xs">
        Coursu.ai 
      </div>
    </div>

    {/* Body */}
    <div className="p-6 md:p-8">
      <div className="w-full aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center overflow-hidden transition-colors duration-300">
        <Image src="/dashboard.png" alt="dashboard" width={1000} height={1000} />
      </div>
    </div>
  </div>
</motion.div>



     
         <motion.div variants={itemVariants} className="w-full mb-20">
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Build Smarter, Learn Faster
    </h2>
    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto transition-colors duration-300">
      Create personalized, adaptive learning experiences powered by intelligent AI — tailored to your goals, pace, and creativity.
    </p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    {features.map((feature: any) => (
      <FeatureCard 
        key={feature.id}
        icon={feature.icon}
        title={feature.title}
        description={feature.description}
        linkText={feature.linkText}
        href={feature.href}
        stats={feature.stats}
        onMouseEnter={() => setHoveredFeature(feature.id)}
        onMouseLeave={() => setHoveredFeature(null)}
        isActive={hoveredFeature === feature.id}
      />
    ))}
  </div>
</motion.div>
          
     
          <motion.section
      ref={containerRef}
      variants={containerVariantss}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full py-12 sm:py-24 text-black dark:text-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div variants={itemVariantss} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            HOW IT WORKS?
          </h2>
        </motion.div>

        <div className="relative">
          {/* Static Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-black/10 dark:bg-white/10 transition-colors duration-300" />

         

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
    <div className="flex flex-col items-center">
      <span className="font-bold text-xs">{step.id}</span>
      {step.icon}
    </div>
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
          









          {/* Pricing Section */}
          <motion.div variants={itemVariants} className="w-full mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto transition-colors duration-300">
                Choose the perfect plan for your learning journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-0">
              {/* Free Plan */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-black/20 dark:bg-white/20 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative bg-white/60 dark:bg-black/60 border-black/10 dark:border-white/10 backdrop-blur-md p-8 rounded-xl border shadow-xl transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-2">Free</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Perfect for getting started</p>
                  <div className="text-4xl font-bold mb-6">$0<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/month</span></div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>10 Course Creation</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Basic AI Features</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Community Support</span>
                    </li>
                  </ul>
                  <button onClick={()=>router.push("/")} className="w-full bg-black/10 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:bg-black/20 dark:hover:bg-white/20 rounded-lg px-6 py-3 font-medium transition-all duration-200">
                    Get Started
                  </button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-black/20 dark:bg-white/20 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative bg-white/60 dark:bg-black/60 border-black/10 dark:border-white/10 backdrop-blur-md p-8 rounded-xl border shadow-xl transition-all duration-300">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Pro</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">For serious learners</p>
                  <div className="text-4xl font-bold mb-6">$29<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/month</span></div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Unlimited Courses</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Advanced AI Features</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Priority Support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Analytics Dashboard</span>
                    </li>
                  </ul>
                  <button onClick={()=>router.push("/")} className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg px-6 py-3 font-medium transition-all duration-200">
                    Start Free Trial
                  </button>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-black/20 dark:bg-white/20 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative bg-white/60 dark:bg-black/60 border-black/10 dark:border-white/10 backdrop-blur-md p-8 rounded-xl border shadow-xl transition-all duration-300">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">For organizations</p>
                  <div className="text-4xl font-bold mb-6">Custom</div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Custom Solutions</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Dedicated Support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Custom Integrations</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>SLA Guarantee</span>
                    </li>
                  </ul>
                  <button onClick={()=>router.push("/")} className="w-full bg-black/10 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:bg-black/20 dark:hover:bg-white/20 rounded-lg px-6 py-3 font-medium transition-all duration-200">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="w-full border-t border-black/10 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center px-4 sm:px-0">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Coursu.ai</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    AI-powered course creation platform for modern learners.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-4">Product</h4>
                  <ul className="space-y-2">
                    <li><a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Create Courses</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Courses</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Pricing</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-4">Company</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">About</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Features</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Enterprise</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Privacy</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Terms</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Security</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-black/10 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center px-4 sm:px-0">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
                  © 2025 Coursu.ai All rights reserved.
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0"> Developed by Adtech</p>
              </div>
             
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Enhanced Feature Card with hover effects and stats
const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  linkText, 
  href, 
  stats,
  onMouseEnter,
  onMouseLeave,
  isActive
}:any) => {
  return (
    <motion.div 
      className="group relative"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium shadow-lg z-20 transition-colors duration-300"
          >
            {stats}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute -inset-1 bg-black/20 dark:bg-white/20 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
      <div className="h-full border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/60 border backdrop-blur-md p-8 rounded-xl transition-all duration-300 relative z-10 overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-black/5 dark:from-white/5 to-transparent transition-colors duration-300"></div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 blur-2xl rounded-full bg-black/5 dark:bg-white/5 transition-colors duration-300"></div>
        
        <div className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center mb-6 transition-colors shadow-lg duration-300">
          <div className="w-7 h-7">{icon}</div>
        </div>
        
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg transition-colors duration-300">{description}</p>
        
        <a href={href} className="inline-flex items-center py-2 px-4 rounded-lg bg-black/10 dark:bg-white/10 text-gray-800 dark:text-gray-200 group-hover:bg-black/20 dark:group-hover:bg-white/20 transition-all font-medium">
          {linkText}
          <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};