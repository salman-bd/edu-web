"use client"

import Link from 'next/link';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/profile/popover"
import { Mail, Search, ExternalLink, MessageCircleCode } from 'lucide-react'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { Input } from "../ui/input"
import { motion } from "framer-motion"

export function ProfilePopover() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')

  const { data: session } = useSession(); 
  const userSession = session?.user;

  const handleSignOut = () => {
    signOut({callbackUrl:'/'});
  }
  const profilePageRedirect = () => {  
    router.push('/profile');  
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchTerm)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userSession?.image} alt={userSession?.name} />
            <AvatarFallback className="bg-indigo-600 text-white">{userSession?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-white rounded-lg shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col space-y-4"
        >
          <form onSubmit={handleSearch} className="flex w-full max-w-sm space-x-2 mx-auto">
            <Input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-indigo-200 focus:border-indigo-600"
            />
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userSession?.image} alt={userSession?.name} />
              <AvatarFallback className="bg-indigo-600 text-white text-xl">{userSession?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-800">{userSession?.name}</h4>
              <p className="text-sm text-gray-500">{userSession?.username}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="h-5 w-5 text-indigo-600" />
            <span>{userSession?.email}</span>
          </div>
          <Link href="/admissions" className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
            <ExternalLink className='h-5 w-5'/>
            <span>Visit Admission Page</span>
          </Link>
          <Link href="/contact" className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
            <MessageCircleCode className='h-5 w-5'/>
            <span>Contact Us</span>
          </Link>

          <Button className="w-full bg-red-800 hover:bg-red-700 text-white" onClick={() => {handleSignOut(); setIsOpen(false)}}>
            Sign out
          </Button>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => {profilePageRedirect(); setIsOpen(false)}}>
            View Profile
          </Button>
        </motion.div>
      </PopoverContent>
    </Popover>
  )
}
