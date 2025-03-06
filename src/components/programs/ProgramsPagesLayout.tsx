
import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ReactNode } from "react"
import { ArrowLeft } from 'lucide-react'

interface ProgramsPagesLayoutProps {
  title: string
  description: string
  tabs: { value: string; label: string; content: ReactNode }[]
}

export default function ProgramsPagesLayout({ title, description, tabs }: ProgramsPagesLayoutProps) {

  return (
    <div className="min-h-screen bg-gray-100 py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/programs" className="inline-flex items-center text-white hover:text-indigo-200 mb-4">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Programs
          </Link>
          <motion.h1
            className="text-3xl font-extrabold sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mt-4 text-xl max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue={tabs[0].value} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 max-w-2xl mx-auto">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="text-sm sm:text-base py-2 px-4">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-8 space-y-8">
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.content}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </main>
    </div>
  )
}