'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <div className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <motion.h1
            className="text-4xl font-extrabold sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to Classic School And College
          </motion.h1>
          <motion.p
            className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-white px-4 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empowering minds and shaping futures through quality education from elementary to college level.
          </motion.p>
          <motion.div
            className="mt-10 flex justify-center gap-4 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-red-800 text-white hover:bg-red-700 px-6">
              <Link href="/programs">Explore Programs</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white px-6"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}