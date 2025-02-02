'use client'

import ProgramsPagesLayout from "@/components/programs/ProgramsPagesLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function ElementarySchool() {
  const tabs = [
    {
      value: "overview",
      label: "Overview",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Our Elementary School program is designed to build a strong foundation for lifelong learning. We focus on
            developing essential skills in literacy, numeracy, and critical thinking while nurturing creativity and
            social-emotional growth.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Grades: Kindergarten to 5th Grade</li>
            <li>Language Medium: English and Bangla</li>
            <li>Class Size: Maximum of 20 students per class</li>
            <li>Curriculum: Aligned with international standards, emphasizing hands-on learning</li>
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
            { title: "Language Arts", content: "Phonics, reading comprehension, writing, and oral communication" },
            { title: "Mathematics", content: "Number sense, problem-solving, and basic algebraic concepts" },
            { title: "Science", content: "Hands-on experiments and inquiry-based learning" },
            { title: "Social Studies", content: "Local and world cultures, history, and geography" },
            { title: "Art and Music", content: "Creative expression and appreciation of various art forms" },
            { title: "Physical Education", content: "Motor skills development and team sports introduction" },
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
          <h3 className="text-2xl font-bold text-indigo-600">Unique Aspects of Our Elementary Program</h3>
          <ul className="list-disc list-inside space-y-4 text-gray-700">
            <li>Weekly STEM activities to foster curiosity and problem-solving skills</li>
            <li>Language immersion opportunities to support bilingual development</li>
            <li>Character education program to develop strong values and social skills</li>
            <li>Regular field trips to enhance experiential learning</li>
            <li>After-school clubs for diverse interests (e.g., robotics, art, chess)</li>
          </ul>
        </div>
      ),
    },
  ]

  return (
    <ProgramsPagesLayout
      title="Elementary School"
      description="Building a strong foundation for lifelong learning through engaging, student-centered education."
      tabs={tabs}
    />
  )
}