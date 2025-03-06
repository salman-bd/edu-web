"use client"

import { AdmissionSteps } from "@/components/admissions/AdmissionSteps"
import { ApplicationDeadlines } from "@/components/admissions/AdmissionDeadlines"
import { AdmissionsContact } from "@/components/admissions/AdmissionsContact"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { GraduationCap, Users, Award, Globe } from "lucide-react"
import Link from "next/link"

export default function Admissions() {
  const admissionHighlights = [
    {
      icon: GraduationCap,
      title: "Diverse Programs",
      description: "From elementary to college, we offer a wide range of academic programs.",
    },
    { icon: Users, title: "Supportive Community", description: "Join a welcoming and inclusive learning environment." },
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Our students consistently achieve outstanding results.",
    },
    { icon: Globe, title: "Global Perspective", description: "Prepare for success in an interconnected world." },
  ]

  return (
    <div className="container space-y-16 py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.header
        className="text-center space-y-6 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold tracking-tight text-indigo-600">Admissions</h1>
        <p className="text-xl text-gray-600 text-left max-w-2xl mx-auto">
          Join our vibrant academic community. Learn about our admission process, requirements, and how to apply for
          both our school and college programs.
        </p>
        <div className="flex justify-center space-x-4 mt-8">
          <Link
            href="application"
            className="bg-red-800 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors duration-300 text-lg font-semibold"
          >
            Apply Now
          </Link>
          <Link
            href="/admissions/contact"
            className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 px-6 py-3 rounded-md transition-colors duration-300 text-lg font-semibold"
          >
            Contact Admissions
          </Link>
        </div>
      </motion.header>

      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {admissionHighlights.map((highlight, index) => (
          <motion.div
            key={highlight.title}
            className="bg-white p-6 rounded-lg shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <highlight.icon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
            <p className="text-gray-600">{highlight.description}</p>
          </motion.div>
        ))}
      </motion.section>

      <Tabs defaultValue="school" className="w-full">
        <TabsList className="flex flex-col md:flex-row justify-center items-center mb-8">
          <TabsTrigger value="school" className="text-lg px-6 py-3">
            School Admissions
          </TabsTrigger>
          <TabsTrigger value="college" className="text-lg px-6 py-3">
            College Admissions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="school">
          <AdmissionSteps level="school" />
          <ApplicationDeadlines level="school" />
        </TabsContent>
        <TabsContent value="college">
          <AdmissionSteps level="college" />
          <ApplicationDeadlines level="college" />
        </TabsContent>
      </Tabs>

      <section id="apply-now" className="bg-indigo-600 text-white rounded-lg p-8 shadow-lg">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold">Ready to Begin Your Journey?</h2>
          <p className="text-lg text-indigo-200 text-left">
            Take the first step towards a bright future. Start your application process today or reach out to our
            admissions team for guidance.
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <Link
              href="/application"
              className="bg-red-800 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors duration-300 text-lg font-semibold"
            >
              Start Application
            </Link>
            <Link
              href="/admissions/contact"
              className="bg-white text-indigo-600 hover:bg-indigo-100 px-6 py-3 rounded-md transition-colors duration-300 text-lg font-semibold"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>

      <AdmissionsContact />
    </div>
  )
}

