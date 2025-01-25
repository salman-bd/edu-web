"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function Facilities() {
  const facilities = [
    { name: "State-of-the-art Classrooms", image: "/placeholder.svg?height=200&width=300" },
    { name: "Modern Science Labs", image: "/placeholder.svg?height=200&width=300" },
    { name: "Extensive Library", image: "/placeholder.svg?height=200&width=300" },
    { name: "Sports Complex", image: "/placeholder.svg?height=200&width=300" },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-indigo-600 sm:text-4xl">Our Facilities</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.name}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={facility.image || "/placeholder.svg"}
                alt={facility.name}
                width={300}
                height={200}
                className="w-full"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-indigo-600">{facility.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

