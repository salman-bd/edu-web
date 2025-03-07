"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function JoinTeam() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-800">
      <div className="py-2 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Join Our Teaching Team</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100 text-left">
            We&apos;re always looking for passionate educators to join our school and college faculty. If you&apos;re
            dedicated to shaping young minds and fostering a love for learning, we&apos;d love to hear from you.
          </p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button asChild size="lg" className="w-full sm:w-auto bg-red-800 hover:bg-red-700 text-white">
              <Link href="/application/teacher">Send a CV</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white text-red-700 hover:bg-white hover:text-indigo-600"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

