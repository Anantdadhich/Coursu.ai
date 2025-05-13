"use client"

import { User } from "next-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Useravatar } from "./useravatar"
import { signOut } from "next-auth/react"
import { LogOut, Settings, User as UserIcon } from "lucide-react"
import Link from "next/link"

type UserProps = {
    user: User
}

export const UserAccount = ({user}: UserProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none ring-0 focus:ring-0">
        <Useravatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-start gap-3 p-3">
          <Useravatar user={user} />
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-medium text-sm">{user.name}</p>}
            {user?.email && (
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator className="my-1" />
        
        <Link href="/settings">
          <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-sm p-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 my-1 transition-colors">
            <Settings className="w-4 h-4" />
            Settings
          </DropdownMenuItem>
        </Link>
        
        <DropdownMenuItem 
          onSelect={() => signOut()} 
          className="cursor-pointer flex items-center gap-2 text-sm p-2.5 rounded-md text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 my-1 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
