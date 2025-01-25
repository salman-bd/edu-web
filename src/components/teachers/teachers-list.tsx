"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const teachers = [
  {
    name: "Dr. Emily Johnson",
    role: "Elementary Education Specialist",
    image: "/placeholder.svg?height=400&width=400",
    bio: "With over 15 years of experience in early childhood education, Dr. Johnson leads our elementary school program with enthusiasm and expertise.",
  },
  {
    name: "Prof. Michael Chen",
    role: "High School Science Department Head",
    image: "/placeholder.svg?height=400&width=400",
    bio: "An award-winning educator, Prof. Chen brings cutting-edge science and technology into our high school classrooms.",
  },
  {
    name: "Dr. Sarah Patel",
    role: "College Mathematics Professor",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Dr. Patel's research in applied mathematics enriches our college-level courses and inspires students to explore the world of numbers.",
  },
  {
    name: "Mr. David Rodriguez",
    role: "Middle School English Teacher",
    image: "/placeholder.svg?height=400&width=400",
    bio: "With a background in creative writing, Mr. Rodriguez makes literature come alive for our middle school students.",
  },
  {
    name: "Ms. Olivia Thompson",
    role: "Physical Education Coordinator",
    image: "/placeholder.svg?height=400&width=400",
    bio: "A former professional athlete, Ms. Thompson promotes health and wellness across all grade levels.",
  },
  {
    name: "Dr. James Lee",
    role: "College History Professor",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Dr. Lee's engaging teaching style and extensive research make history relevant and exciting for our college students.",
  },
]

export default function TeachersList() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
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
    </div>
  )
}

