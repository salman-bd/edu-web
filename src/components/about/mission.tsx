"use client"

import { motion } from "framer-motion"

export default function Mission() {
  const listItems = [
    "Foster a love for lifelong learning",
    "Prepare students for the challenges of the 21st century",
    "Promote diversity, inclusivity, and global awareness",
    "Develop critical thinking and problem-solving skills",
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-indigo-600 sm:text-4xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Mission
        </motion.h2>
        <motion.div
          className="mt-6 text-xl text-gray-600 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>
            Our mission is to provide a nurturing and challenging educational environment that empowers students of all
            ages to reach their full potential. We strive to:
          </p>
          <ul className="mt-4 list-disc list-inside">
            {listItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

