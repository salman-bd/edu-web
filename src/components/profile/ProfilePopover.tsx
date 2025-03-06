"use client"

import Link from 'next/link';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/profile/popover"
import { Mail, Search, ExternalLink, MessageCircleCode } from 'lucide-react'
import { useSession, signOut } from "next-auth/react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { motion } from "framer-motion"
// import SearchProfile from './SearchProfile';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { useDebouncedCallback } from 'use-debounce';

export function ProfilePopover() {
  const { data: session } = useSession(); 
  const userSession = session?.user;
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);
    
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);



  const handleSignOut = () => {
    signOut({callbackUrl:'/'});
  }
  // const profilePageRedirect = () => {  
  //   router.push('/profile');  
  // }

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   console.log('Searching for:', searchProfile)
  // }

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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-indigo-600 border-2">
            <CardHeader className="bg-indigo-600 text-white rounded-tl-lg rounded-tr-lg p-2">
              <CardTitle className="text-2xl font-bold text-center">Search Profiles</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <form onSubmit={handleSearch} className="flex flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Enter the name or ID"
                  onChange={(e) => {handleSearch(e.target.value)}}
                  defaultValue={searchParams.get('query')?.toString()}
                  className="flex-grow border-2 border-indigo-600 focus:border-red-700 focus:ring-red-700"
                />
                <Button type="submit" className="bg-red-800 text-white hover:bg-red-700">
                  <Search className="mr-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
          {/* <form onSubmit={handleSearch} className="flex w-full max-w-sm space-x-2 mx-auto">
            <Input
              type="text"
              placeholder="Search profile..."
              value={searchProfile}
              onChange={(e) => setSearchProfile(e.target.value)}
              className="border-indigo-200 focus:border-indigo-600"
            />
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Search className="h-4 w-4" />
            </Button>
          </form> */}
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

          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white " onClick={() => {handleSignOut(); setIsOpen(false)}}>
            Sign out
          </Button>
          {/* <Button className="w-full bg-red-800 hover:bg-red-700 text-white" onClick={() => {profilePageRedirect(); setIsOpen(false)}}>
            View Profile
          </Button> */}
        </motion.div>
      </PopoverContent>
    </Popover>
  )
}
