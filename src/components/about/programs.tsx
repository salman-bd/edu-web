"use client"

import { motion } from "framer-motion"

export default function Programs() {
  const programs = [
    { name: "Elementary School", description: "Grades K-5" },
    { name: "Middle School", description: "Grades 6-8" },
    { name: "High School", description: "Grades 9-12" },
    { name: "College Degree", description: "2-year college programs" },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-indigo-600 sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Programs
        </motion.h2>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={program.name}
              className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-indigo-600">{program.name}</h3>
              <p className="mt-2 text-gray-600">{program.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

