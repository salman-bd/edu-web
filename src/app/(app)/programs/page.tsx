"use client"

import { useState } from "react"
import { ProgramList } from "@/components/programs/program-list"
import { ProgramSearch } from "@/components/programs/program-search"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState<"elementary" | "middle" | "high" | "college">("elementary")

  const tabs = [
    { value: "elementary", label: "Elementary School" },
    { value: "middle", label: "Middle School" },
    { value: "high", label: "High School" },
    { value: "college", label: "College" },
  ]

  return (
    <div className="container space-y-16 py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.header
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-indigo-600">Academic Programs</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our diverse range of academic programs designed to nurture curiosity, foster growth, and prepare
          students for future success.
        </p>
      </motion.header>

      <Tabs
        defaultValue="elementary"
        className="w-full"
        onValueChange={(value) => setActiveTab(value as "elementary" | "middle" | "high" | "college")}
      >
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 max-w-2xl mx-auto">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-sm sm:text-base py-2 px-4">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-8 space-y-8">
          <ProgramSearch />
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <ProgramList level={tab.value} />
            </TabsContent>
          ))}
        </div>
      </Tabs>

      <motion.div
        className="bg-indigo-600 text-white rounded-lg p-8 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold">Ready to Join Our Academic Community?</h2>
          <p className="text-lg text-indigo-200">
            Take the first step towards a bright future. Apply now or contact our admissions team for more information.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
            <a
              href="/admissions"
              className="bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors duration-300"
            >
              Apply Now
            </a>
            <a
              href="/contact"
              className="bg-white text-indigo-600 hover:bg-indigo-100 px-6 py-2 rounded-md transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

