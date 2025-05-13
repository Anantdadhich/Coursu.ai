"use client"

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"
import { LogIn } from "lucide-react"

export const Signinbutton = () => {
  return (
   <Button 
     variant="default" 
     onClick={() => signIn("google")}
     className="flex items-center gap-2 rounded-full px-4 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
   >
     <LogIn className="w-4 h-4" />
     <span>Sign In</span>
   </Button>
  )
}


