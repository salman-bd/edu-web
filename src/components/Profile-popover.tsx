"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Mail, MapPin } from 'lucide-react'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { socialRegistration } from "@/app/api/social-register/route"
import useUserStore from "@/stores/reducers/userReducer"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"


export function ProfilePopover() {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [currentSession, setCurrentSession] = useState(null);  

  useEffect(() => {  
    const storedSession = localStorage.getItem('userSession');  
    if (storedSession) {  
        const parsedSession = JSON.parse(storedSession);  
        setCurrentSession(parsedSession);
    }  
  }, []); // Run once on mount  
  const userSession = currentSession?.user;


  const handleSignOut = () => {  
    localStorage.removeItem('userSession');  
    signOut({ callbackUrl: '/' });
  };  

  const profilePageRedirect = () => {  
    router.replace('/profile');  
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
    
        <Button variant="ghost" className="h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userSession?.image} alt={userSession?.name} />
            <AvatarFallback className="bg-violet-600 text-white">{userSession?.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userSession?.image} alt={userSession?.name} />
              <AvatarFallback className="bg-violet-600 text-white">{userSession?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-lg font-semibold">{userSession?.name}</h4>
              <p className="text-sm text-muted-foreground">{userSession?.username}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{userSession?.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />

          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{userSession?.joinDate}</span>
          </div>

          <Button className="w-full" onClick={() => {handleSignOut(); setIsOpen(false)}}>
            Sign out
          </Button>
          <Button className="w-full" onClick={() => {profilePageRedirect(); setIsOpen(false)}}>
            View Profile
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

