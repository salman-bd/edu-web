'use client'


import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card"

const programs = [
  { name: "Elementary School", description: "Grades K-5", href: "/programs/elementary" },
  { name: "Middle School", description: "Grades 6-8", href: "/programs/middle" },
  { name: "High School", description: "Grades 9-12", href: "/programs/high" },
  { name: "College", description: "Associate and Bachelor's Degrees", href: "/programs/college" },
]

export default function Programs() {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-indigo-600 sm:text-4xl ">Our Programs</h2>
          <p className="mt-4 text-xl text-gray-600">Explore our comprehensive educational offerings.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-indigo-600 border-2 hover:border-red-700 transition-colors duration-300 h-full">
                <CardHeader>
                  <CardTitle className="text-indigo-600">{program.name}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={program.href}
                    className="text-base font-medium text-red-700 hover:text-indigo-600 flex items-center transition-colors duration-300"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-5 w-5" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}