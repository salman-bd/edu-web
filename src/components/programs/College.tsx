'use client'

import ProgramsPagesLayout from "@/components/programs/ProgramsPagesLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function College() {
  const tabs = [
    {
      value: "overview",
      label: "Overview",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Our College Preparation program is designed to provide students with the knowledge, skills, and experiences
            necessary for success in higher education. We offer a rigorous academic curriculum combined with
            comprehensive college counseling and preparation services.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Grades: 11th to 12th Grade</li>
            <li>Language Medium: English and Bangla</li>
            <li>Class Size: Maximum of 20 students per class</li>
            <li>Curriculum: Advanced college-preparatory program with extensive AP and research opportunities</li>
          </ul>
        </div>
      ),
    },
    {
      value: "curriculum",
      label: "Curriculum",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "English", content: "Literature analysis, advanced composition, and public speaking" },
            { title: "Mathematics", content: "Algebra, Trigonometry and Calculus" },
            { title: "Science", content: "Biology, Chemistry, Physics, and options" },
            { title: "Social Studies", content: "World History, Economics, Government, and options" },
            { title: "Business Studies", content: "Business Organization & Management, Accounting, Finance & Bangking, and options" },
          ].map((subject, index) => (
            <motion.div
              key={subject.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-indigo-600">{subject.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{subject.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      value: "features",
      label: "Special Features",
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-indigo-600">Unique Aspects of Our College Preparation Program</h3>
          <ul className="list-disc list-inside space-y-4 text-gray-700">
            <li>Advisory program for personalized academic and social-emotional support</li>
            <li>Project-based learning initiatives to develop collaboration and presentation skills</li>
            <li>Leadership development opportunities through student government and community service</li>
            <li>Interscholastic sports and competitive academic teams</li>
            <li>Career exploration workshops and high school preparation seminars</li>
            <li>Leadership roles in clubs, sports, and community service projects</li>
          </ul>
        </div>
      ),
    },
  ]

  return (
    <ProgramsPagesLayout
      title="College Preparation"
      description="Preparing students for success in higher education and beyond through rigorous academics and comprehensive college counseling."
      tabs={tabs}
    />
  )
}