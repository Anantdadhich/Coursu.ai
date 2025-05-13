import { User } from "next-auth"
import { Avatar, AvatarFallback } from "./ui/avatar"
import Image from "next/image"

type UserProps = {
    user: User
}

export const Useravatar = ({user}: UserProps) => {
  // Get initials for the avatar fallback
  const getInitials = (name: string) => {
    const parts = name?.split(' ') || [];
    return parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : name?.slice(0, 2).toUpperCase() || '?';
  };

  return (
    <Avatar className="border-2 border-primary/10 shadow-sm hover:shadow-md transition-all duration-300 ring-offset-background">
      {user.image ? (
        <div className="relative w-full h-full aspect-square overflow-hidden">
          <Image 
            fill 
            src={user.image} 
            alt={`${user?.name}'s profile picture`} 
            referrerPolicy="no-referrer"
            className="object-cover"
          />
        </div>
      ) : (
        <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground font-medium">
          {getInitials(user?.name || '')}
        </AvatarFallback>
      )}
    </Avatar>
  )
}


