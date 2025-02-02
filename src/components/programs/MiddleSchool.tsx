'use client'

import ProgramsPagesLayout from "@/components/programs/ProgramsPagesLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function MiddleSchool() {
  const tabs = [
    {
      value: "overview",
      label: "Overview",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Our Middle School program is designed to support students through the crucial transition years, fostering
            academic excellence, personal growth, and preparation for high school challenges.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Grades: 6th to 8th Grade</li>
            <li>Language Medium: English and Bangla</li>
            <li>Class Size: Maximum of 24 students per class</li>
            <li>Curriculum: Rigorous academic program with increased subject specialization</li>
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
            { title: "Language Arts", content: "Advanced reading, writing, and analytical skills" },
            { title: "Mathematics", content: "Pre-algebra, algebra, and geometry foundations" },
            { title: "Science", content: "Life, physical, and earth sciences with lab work" },
            { title: "Social Studies", content: "World history, geography, and civics" },
            { title: "Foreign Languages", content: "Introduction to a third language (e.g., Arabic)" },
            { title: "Technology", content: "Digital literacy, coding, and responsible online behavior" },
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
          <h3 className="text-2xl font-bold text-indigo-600">Unique Aspects of Our Middle School Program</h3>
          <ul className="list-disc list-inside space-y-4 text-gray-700">
            <li>Advisory program for personalized academic and social-emotional support</li>
            <li>Project-based learning initiatives to develop collaboration and presentation skills</li>
            <li>Leadership development opportunities through student government and community service</li>
            <li>Interscholastic sports and competitive academic teams</li>
            <li>Career exploration workshops and high school preparation seminars</li>
          </ul>
        </div>
      ),
    },
  ]

  return (
    <ProgramsPagesLayout
      title="Middle School"
      description="Nurturing curiosity and developing essential skills for future success in a supportive environment."
      tabs={tabs}
    />
  )
}

