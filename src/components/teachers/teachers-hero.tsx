"use client"

import { Users } from "lucide-react"
import { motion } from "framer-motion"

export default function TeachersHero() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Users className="mx-auto h-20 w-20 text-red-400" />
          </motion.div>
          <motion.h1
            className="mt-6 text-4xl font-extrabold sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Our Dedicated Faculty
          </motion.h1>
          <motion.p
            className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Meet the passionate educators shaping the minds of tomorrow across our school and college programs.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

