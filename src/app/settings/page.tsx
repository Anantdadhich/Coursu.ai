

import SubscriptionButton from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, HomeIcon, LogOut, Plus, Settings2, User } from "lucide-react";
import Link from "next/link";
import { Particles } from "@/components/ui/Backgroundbeams";


type Props = {};

const SettingsPage = async (props: Props) => {
  const isPro = await checkSubscription();

  return (
    <div className="min-h-screen w-full bg-neutral-300 dark:bg-neutral-900 text-black dark:text-white transition-colors duration-300 p-4 md:p-8 lg:p-20">
       <Particles  className="absolute inset-0 z-0 "
        quantity={100}
        ease={80}
        size={1}

        refresh/>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Settings2 className="w-8 h-8 text-black dark:text-white" />
          <h1 className="text-3xl md:text-5xl font-bold text-black dark:text-white">
            Account Settings
          </h1>
        </div>

        {/* User Status Card */}
        <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-xl mb-8 border border-gray-300 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full">
                <User className="w-6 h-6 text-black dark:text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{isPro ? "Pro Plan" : "Free Plan"}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {isPro
                    ? "Unlimited access to all features"
                    : "Upgrade to unlock premium features"}
                </p>
              </div>
            </div>
            <SubscriptionButton isPro={isPro} />
          </div>
        </div>

        {/* Settings Sections */}
        <div className="grid gap-6">
          {/* Appearance */}
          

          {/* Billing */}
          {isPro && (
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Billing
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Manage your subscription and payment methods
              </p>
              <Button variant="outline" className="w-full md:w-auto">
                View Billing Portal
              </Button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ArrowRight className="w-5 h-5" /> Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <Link href="/">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <HomeIcon className="w-4 h-4" /> Home
                </Button>
              </Link>
              <Link href="/create">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Plus className="w-4 h-4" /> New Chat
                </Button>
              </Link>
              
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
