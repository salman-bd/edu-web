"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import Link from "next/link"
import { TeacherProfileAlertDialog } from "../profile/TeacherProfileAlertDialog"
import { useState } from "react"
import { useRouter } from "next/navigation"


const teachers = [
  {
    name: "Mr. Name",
    role: "Elementary Education Specialist",
    image: "/teachers/demo-avatar.png",
    bio: "With over 15 years of experience in early childhood education, Mr. Name leads our elementary school program with enthusiasm and expertise.",
  },
 
]

export default function TeachersList() {
  const router = useRouter()
  const [isProfileCreateDialogOpen, setIsProfileCreateDialogOpen] = useState(false)

  const closeProfileCreateDialogOpen = () => setIsProfileCreateDialogOpen(false);
  const profileCreateHandler = () => setIsProfileCreateDialogOpen(true);
  
  const profileCreateContinue = (isCscAffiliated: string) => {
    closeProfileCreateDialogOpen()
    if (isCscAffiliated === "yes") {
      router.push(`/profile/teacher?isCscAffiliated=${true}`)
    } else if (isCscAffiliated === "no") {
      router.push(`/profile/teacher`)
    } 
  }

  return (
    <div className="bg-gray-50 py-12 md:py-16 space-y-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">Meet Our Faculty</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our diverse team of educators brings a wealth of knowledge and experience to inspire and guide our students.
          </p>
        </motion.div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {teachers.map((teacher, index) => (
            <motion.li
              key={teacher.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={teacher.image || "/placeholder.svg"}
                  alt={teacher.name}
                  width={400}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">{teacher.name}</h3>
                <p className="text-base leading-7 text-red-700">{teacher.role}</p>
                <p className="mt-4 text-base leading-7 text-gray-600">{teacher.bio}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="text-center">
      <Link href={'/profile/teacher'}>
        <Button onClick={profileCreateHandler} className='bg-indigo-600 hover:bg-indigo-700 text-center m-auto m-t-4'>Create Teacher Profile</Button>
      </Link>
      </div>
      <TeacherProfileAlertDialog isOpen={isProfileCreateDialogOpen} onClose={closeProfileCreateDialogOpen} onContinue={profileCreateContinue} />
    </div>
  )
}

