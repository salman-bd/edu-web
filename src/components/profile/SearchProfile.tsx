"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import ProfileSearchResults from "@/components/profile/ProfileSearchResults"
import type { ProfileType } from "@/types/profile"

export default function SearchProfile() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [searchResults, setSearchResults] = useState<ProfileType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = useDebouncedCallback((name) => {
    console.log(`Searching... ${name}`)

    const params = new URLSearchParams(searchParams)
    if (name) {
      params.set("query", name)
    } else {
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  useEffect(() => {
    const query = searchParams.get("query")
    // console.log('Query to search profile: ', query);
    if (query && query.length > 2) {
      fetchProfiles(query)
    } else {
      setSearchResults([])
    }
  }, [searchParams])

  const fetchProfiles = async (query: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/profile/search?query=${encodeURIComponent(query)}`)
      // console.log('Response: ', response);
      if (!response.ok) {
        throw new Error("Failed to fetch profiles")
      }
      const data = await response.json()
      setSearchResults(data.profiles)

    } catch (err) {
      console.error("Error fetching profiles:", err)
      setError("Failed to load profiles. Please try again.")
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="bg-gray-100 ">
      <div className="max-w-4xl mx-auto ">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-indigo-600 border-2">
            <CardHeader className="bg-indigo-600 text-white rounded-tl-lg rounded-tr-lg p-2">
              <CardTitle className="text-2xl font-bold text-center">Search Profiles</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
            <form onSubmit={(e) => {
              e.preventDefault();
              fetchProfiles(searchParams.get("query") || "");
            }}>
              <div className="flex flex-row gap-4">
                <Input
                  type="text"
                  placeholder="Enter the name, email or phone"
                  onChange={(e) => {
                    handleSearch(e.target.value)
                  }}
                  defaultValue={searchParams.get("query")?.toString()}
                  className="flex-grow border-2 border-indigo-600 focus:border-red-700 focus:ring-red-700"
                />
                <Button type="submit" className="hidden md:flex flex-row bg-red-800 text-white hover:bg-red-700">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button type="submit" className="flex md:hidden bg-red-800 text-white hover:bg-red-700">
                  <Search className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </form>
            </CardContent>
          </Card>

          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-white rounded-lg shadow text-center"
              >
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
                <p className="mt-2 text-indigo-600">Searching profiles...</p>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
              >
                {error}
              </motion.div>
            )}

            {!isLoading && searchResults.length > 0 && <ProfileSearchResults results={searchResults} />}

            {!isLoading &&
              searchParams.get("query") &&
              searchParams.get("query")!.length > 2 &&
              searchResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-6 bg-white rounded-lg shadow text-center"
                >
                  <p className="text-gray-500">No profiles found matching your search.</p>
                </motion.div>
              )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

