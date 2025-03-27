'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function CTA() {
  return (
    <div className="bg-indigo-600 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl ">
            <span className="">Ready to start your educational journey?</span> <br />
            <span className=" text-white">Join our school and college community today.</span>
          </h2>
        </motion.div>
        <motion.div
          className="mt-8 flex lg:mt-0 lg:flex-shrink-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button asChild size="lg" className="bg-red-800 text-white hover:bg-red-700">
            <Link href="/application/student">Apply Now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="ml-3 bg-transparent text-white border-white hover:bg-white"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}