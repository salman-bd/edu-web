"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function ProgramSearch() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchTerm)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-lg space-x-2 mx-auto px-4 sm:px-6 lg:px-8">
      <Input
        type="text"
        placeholder="Search programs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-indigo-600 focus:ring-indigo-600"
      />
      <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  )
}

