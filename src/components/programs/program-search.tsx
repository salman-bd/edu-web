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
    <form onSubmit={handleSearch} className="flex w-full max-w-lg space-x-2 mx-auto">
      <Input
        type="text"
        placeholder="Search programs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-indigo-600 focus:ring-indigo-600"
      />
      <Button type="submit" className="bg-red-700 hover:bg-red-600 text-white">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  )
}

