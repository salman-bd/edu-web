"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { GraduationCap, BookOpen, Users } from 'lucide-react'

export default function AdmissionsHero() {
  return (
    <section className="bg-gradient-to-b from-indigo-600 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-left px-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl mb-6">
              Begin Your Journey Here
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover your potential and shape your future through our comprehensive admissions process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-red-800 text-white hover:bg-red-700">
                <Link href="#application-process">Start Application</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#contact-admissions">Contact Admissions</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { icon: GraduationCap, title: "Elementary to College", description: "Comprehensive programs for all levels" },
              { icon: BookOpen, title: "Diverse Curriculum", description: "Tailored learning experiences" },
              { icon: Users, title: "Supportive Community", description: "Inclusive and nurturing environment" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 p-6 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className="h-12 w-12 mx-auto mb-4 text-red-400" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-indigo-100">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}