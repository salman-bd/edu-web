"use client"

import { ProgramSearch } from "@/components/programs/ProgramSearch"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const schoolPrograms = [
  {
    id: 1,
    name: "Elementary Education",
    description: "Foundational learning for grades K-5, focusing on core subjects and social development.",
    level: "elementary",
    grades: "K-5",
    link: "/programs/elementary",
  },
  {
    id: 2,
    name: "Middle School Program",
    description:
      "Comprehensive education for grades 6-8, preparing students for high school with a focus on critical thinking and personal growth.",
    level: "middle",
    grades: "6-8",
    link: "/programs/middle",
  },
  {
    id: 3,
    name: "High School Program",
    description:
      "Comprehensive education for grades 9-10, preparing students for college with a focus on critical thinking and personal growth.",
    level: "high",
    grades: "9-10",
    link: "/programs/high",
  },
  {
    id: 4,
    name: "College Preparation Program",
    description:
      "College curriculum for grades 11-12, offering a wide range of subjects, electives, and advanced placement courses.",
    level: "college",
    grades: "11-12",
    link: "/programs/college",
  },
]

export default function Programs() {
  return (
    <div className="container space-y-16 py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.header
        className="text-center space-y-4 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-indigo-600">Academic Programs</h1>
        <p className="text-xl text-gray-600 text-left max-w-2xl mx-auto">
          Explore our diverse range of academic programs designed to nurture curiosity, foster growth, and prepare
          students for future success.
        </p>
      </motion.header>

      <div className="space-y-8 ">
        <ProgramSearch />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-4 sm:px-6 lg:px-8">
          {schoolPrograms.map((program) => (
            <Link key={program.id} href={program.link}>
              <Card className="border-indigo-600 border-t-2 hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-indigo-600">{program.name}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mt-4">
                    <Badge className="bg-indigo-600 hover:bg-indigo-700">{program.level}</Badge>
                    <span className="text-sm text-indigo-600 font-medium">Grades {program.grades}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <motion.div
        className="bg-indigo-600 text-white rounded-lg p-8 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold">Ready to Join Our Academic Community?</h2>
          <p className="text-lg text-indigo-200">
            Take the first step towards a bright future. Apply now or contact our admissions team for more information.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
            <Link
              href="/admissions"
              className="bg-white text-red-600 hover:bg-indigo-100 px-6 py-2 rounded-md transition-colors duration-300"
            >
              Apply Now
            </Link>
            <Link
              href="/admissions/contact"
              className="bg-indigo-700 text-white hover:bg-indigo-800 px-6 py-2 rounded-md transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

