import SubscriptionButton from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
 
  CreditCard,
 
  HomeIcon,
 

  Plus,
  Settings2,

  Zap,
} from "lucide-react";
import Link from "next/link";
import { Particles } from "@/components/ui/Backgroundbeams";
import { SubscriptionActionCard } from "@/components/SubscriptionActionCard";
import { Useravatar } from "@/components/useravatar";
import { ProfileSection } from "@/components/ProfileSction";


type Props = {
  
};



const SettingsPage = async (props: Props) => {
  const isPro = await checkSubscription();

  return (
    <div className="min-h-screen w-full bg-neutral-300 dark:bg-neutral-900 text-black dark:text-white transition-colors duration-300 p-6 sm:p-12 md:p-24 relative overflow-hidden">

      <Particles className="absolute inset-0 z-0" quantity={100} ease={80} size={1} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-10 justify-center text-center">
          <div className="p-3 bg-black dark:bg-white rounded-full shadow-md">
            <Settings2 className="w-4 h-4 text-white dark:text-black" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
            Account Settings
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl mx-auto">
          {/* Main content */}
          <div className="col-span-1 md:col-span-4 space-y-6">
            <ProfileSection />
            
            {/* User Status Card */}
            <div className="bg-neutral-100 dark:bg-neutral-900 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-1">Your Subscription</h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  Manage your subscription and access premium features
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${isPro ? 'bg-gradient-to-tr from-purple-500 to-blue-500' : 'bg-neutral-200 dark:bg-neutral-700'}`}>
                    <Zap className={`w-6 h-6 ${isPro ? 'text-white' : 'text-black dark:text-white'}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      {isPro ? "Pro Plan" : "Free Plan"}
                      {isPro && <span className="text-xs font-normal py-1 px-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full">Active</span>}
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {isPro
                        ? "Unlimited access to all features"
                        : "Upgrade to unlock premium features"}
                    </p>
                  </div>
                </div>
                <SubscriptionButton isPro={isPro} />
              </div>

              {!isPro && (
                <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-base font-semibold mb-4 text-center">Your Free Trials</h3>
                  <div className="flex justify-center">
                    <SubscriptionActionCard />
                  </div>
                </div>
              )}
              
              {isPro && (
                <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <h4 className="font-medium mb-1">Plan Benefits</h4>
                    <ul className="text-sm space-y-1 text-neutral-600 dark:text-neutral-400">
                      <li className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-blue-500" />
                        Unlimited courses
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-blue-500" />
                        Priority support
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-blue-500" />
                        Advanced features
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <h4 className="font-medium mb-1">Usage</h4>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      <div className="flex justify-between mb-1">
                        <span>Course Credits</span>
                        <span>Unlimited</span>
                      </div>
                      <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                    <h4 className="font-medium mb-1">Next Billing</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Your next payment of <span className="font-medium">$14.99</span> will be processed on <span className="font-medium">June 15, 2023</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-neutral-100 dark:bg-neutral-900 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ArrowRight className="w-5 h-5" /> Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link href="/">
                  <Button variant="outline" className="w-full justify-start gap-2 h-12 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                    <HomeIcon className="w-4 h-4" /> Go to Dashboard
                  </Button>
                </Link>
                <Link href="/create">
                  <Button variant="outline" className="w-full justify-start gap-2 h-12 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                    <Plus className="w-4 h-4" /> Create New Course
                  </Button>
                </Link>
              </div>
            </div>

            {/* Billing Section */}
            {isPro && (
              <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Billing
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm">
                  Manage your subscription and payment methods
                </p>
                
                <div className="mb-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                      <span className="font-medium">Visa ending in 4242</span>
                    </div>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Expires 09/2025</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm">Update</Button>
                    <Button variant="outline" size="sm" className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30">Remove</Button>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    className="bg-gradient-to-tr from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500 shadow-sm"
                  >
                    View Billing Portal
                  </Button>
                  <Button variant="outline">
                    Billing History
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;