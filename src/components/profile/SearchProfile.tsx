"use client"

// import { useState } from "react"
import { Search } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce';

export default function SearchProfile() {
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
  

  return (
    <div className="bg-gray-100 ">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
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
                <Button type="submit" className="hidden md:flex flex-row bg-red-800 text-white hover:bg-red-700">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button type="submit" className="flex md:hidden bg-red-800 text-white hover:bg-red-700">
                  <Search className="mr-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

