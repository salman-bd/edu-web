"use client"

import { motion } from "framer-motion"

export default function History() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-indigo-600 sm:text-4xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our History
        </motion.h2>
        <motion.div
          className="mt-6 text-xl text-gray-600 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>
            Founded in 2005, our institution has been a beacon of academic excellence for over four decades. What
            started as a small community college has grown into a comprehensive educational institution serving both
            school and college students.
          </p>
          <p className="mt-4">
            Through the years, we&apos;ve adapted to the changing educational landscape, consistently updating our curriculum
            and facilities to provide the best learning experience for our students.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

