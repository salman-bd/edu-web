"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { BookOpen, GraduationCap, ShieldCheck } from "lucide-react"
import type { ProfileType } from "@/types/profile.d"

interface ProfileSearchResultsProps {
  results: ProfileType[]
}

export default function ProfileSearchResults({ results }: ProfileSearchResultsProps) {
  const router = useRouter()
  console.log('Search results: ', results);

  const handleProfileClick = (profile: ProfileType) => {
    console.log('Search profile: ', profile);
    // Navigate to the appropriate profile page based on type
    if (profile.type === "student") {
      router.push(`/profile/student/${profile._id}`)
    } else if (profile.type === "teacher") {
      router.push(`/profile/teacher/${profile._id}`)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="mt-4 space-y-3" variants={container} initial="hidden" animate="show">
      <h2 className="text-lg font-medium text-indigo-700 px-1">Search Results</h2>

      {results.map((profile) => (
        <motion.div
          key={profile._id}
          variants={item}
          whileHover={{ scale: 1.01, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          onClick={() => handleProfileClick(profile)}
          className="cursor-pointer"
        >
          <Card className="p-4 border-l-4 border-l-indigo-600 hover:bg-indigo-50 transition-colors">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-indigo-200">
                <AvatarImage src={profile.photoUrl} alt={profile.fullName} />
                <AvatarFallback className="bg-indigo-100 text-indigo-700">
                  {profile.fullName?.charAt(0) || profile.firstName?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{profile.fullName || `${profile.firstName} ${profile.lastName}`}</h3>
                  {profile.isAffiliated === "true" && <ShieldCheck className="h-4 w-4 text-green-600" />}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    {profile.type}
                  </Badge>

                  {profile.type === "Student" ? (
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{profile.programType}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      <span>{profile.subjectSpecialization}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

