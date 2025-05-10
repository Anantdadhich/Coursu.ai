
import { getAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation";
import { InfoIcon, Sparkles } from "lucide-react";
import CreateCourseForm from "@/components/CreateCourseForm";
import { checkSubscription } from "@/lib/subscription";
import { Particles } from "@/components/ui/Backgroundbeams";



const Createpage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
   const isPro=await checkSubscription()




  return (
    <div className="relative min-h-screen w-full bg-neutral-300 text-black dark:bg-neutral-900 dark:text-white  duration-300 p-4 md:p-16">
      <Particles  className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        size={1}
      
        refresh/>
      <div className="relative z-10 flex items-center justify-center min-h-screen w-full px-6 pt-20 pb-20">



        <div
          
          className="flex flex-col items-center justify-center max-w-4xl w-full"
        >
          {/* Header Section */}
          <div  className="w-full text-center mb-10">
            <h1 
             
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6"
            >
              Create Your Course
            </h1>
            
            <p 
              
              className="font-normal text-lg md:text-xl pb-6 text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300"
            >
              Enter a course title and units to generate a personalized AI learning experience
            </p>
          </div>
          
          {/* Pro Badge */}
          {isPro && (
            <div 
            
              className="w-full flex justify-center mb-6"
            >
              <div className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 backdrop-filter backdrop-blur-lg shadow-xl border rounded-full px-6 py-3 flex items-center space-x-2 transition-colors duration-300">
                <div className="flex items-center justify-center h-5 w-5 bg-black/10 dark:bg-white/10 rounded-full transition-colors duration-300">
                  <Sparkles className="h-3 w-3" />
                </div>
                <span className="text-sm font-medium">Pro Account Active</span>
              </div>
            </div>
          )}
          
          {/* Info Card */}
          <div 
          
            className="w-full mb-10"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-black/20 dark:bg-white/20 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white/60 dark:bg-black/60 border-black/10 dark:border-white/10 backdrop-blur-md p-6 rounded-xl border shadow-xl transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-black/10 dark:bg-white/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <InfoIcon className="w-5 h-5 text-black dark:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">How It Works</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Enter a course title or what you want to learn about. Then enter a
                      list of units, which are the specifics you want to learn. Our AI
                      will generate a course for you!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form Section */}
          <div 
           
            className="w-full"
          >
            <div className="relative group">
              <div className="absolute -inset-2 z-0 rounded-[30px]  blur-xl opacity-70"></div>
              <div className="absolute -inset-1 bg-black/10 dark:bg-white/10 rounded-3xl blur opacity-30 z-10"></div>
              <div className="relative z-20 bg-white/60 dark:bg-black/60 border-black/10 dark:border-white/10 backdrop-filter backdrop-blur-md rounded-3xl overflow-hidden border shadow-2xl transition-colors duration-300 p-6 md:p-8">
                <CreateCourseForm isPro={isPro} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Createpage;