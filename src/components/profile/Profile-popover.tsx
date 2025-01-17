"use client"

import Link from 'next/link';  
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/profile/popover"
import { CalendarDays, Mail, Search, ExternalLink, ChartBar, MessageCircle, MessageCircleHeart, MessageCircleCode, MessageCircleDashed, MessageSquareReply} from 'lucide-react'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import axios from "axios"
import { Input } from "../ui/input"



export function ProfilePopover() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')

  const { data: session } = useSession(); 
  const userSession = session?.user;


  // console.log("User email: ", userEmail)  
  

  // useEffect(() => {
  //   const socialRegister = async () => {
  //     if (!userSession) {
  //       return;
  //     } else {
  //       await axios.get(`/api/social-register?userEmail=${userEmail}`);
  //     }
  //   }
  //   socialRegister();
  // }, [userSession]);


  const handleSignOut = () => {
    signOut({callbackUrl:'/'});
    // router.replace('/');  
  }
  const profilePageRedirect = () => {  
    router.replace(`/profile/`);  
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', searchTerm)
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
          <form onSubmit={handleSearch} className="flex w-full max-w-sm space-x-2 mx-auto">
            <Input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
            </Button>
          </form>
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
            <Mail className="h-5 w-5" />
            <span>{userSession?.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm ">
            <div className='flex flex-row gap-2'>
            <ExternalLink className='h-5 w-5'/>
            <Link href="/admissions" className="">
                Visit Admission Page
              </Link>
            </div>
            

          </div>
          <div className="flex items-center space-x-2 text-sm ">
            <div className='flex flex-row gap-2'>
              <MessageCircleCode className='h-5 w-5'/>
              <Link href="/admissions" className="">
                  Contact To Us
                </Link>
              </div>
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

