import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const schoolPrograms = [
  {
    id: 1,
    name: "Elementary Education",
    description: "Foundational learning for grades K-5, focusing on core subjects and social development.",
    level: "Elementary",
    grades: "K-5",
  },
  {
    id: 2,
    name: "Middle School Program",
    description: "Comprehensive education for grades 6-8, preparing students for high school.",
    level: "Middle School",
    grades: "6-8",
  },
  {
    id: 3,
    name: "High School Diploma",
    description: "College preparatory curriculum for grades 9-12, offering a wide range of subjects and electives.",
    level: "High School",
    grades: "9-12",
  },
  {
    id: 4,
    name: "International Baccalaureate",
    description: "Rigorous international education program fostering critical thinking and global perspective.",
    level: "High School",
    grades: "11-12",
  },
  {
    id: 5,
    name: "STEM Focus Program",
    description: "Specialized program emphasizing Science, Technology, Engineering, and Mathematics.",
    level: "Middle and High School",
    grades: "6-12",
  },
]

const collegePrograms = [
  {
    id: 1,
    name: "Computer Science",
    description:
      "Study the theory, experimentation, and engineering that form the basis for the design and use of computers.",
    level: "Undergraduate",
    duration: "4 years",
  },
  {
    id: 2,
    name: "Business Administration",
    description:
      "Develop a broad understanding of business operations and gain targeted skills in specific disciplines.",
    level: "Undergraduate",
    duration: "4 years",
  },
  {
    id: 3,
    name: "Environmental Science",
    description:
      "Examine how humans interact with their environment and how these interactions affect the world around us.",
    level: "Undergraduate",
    duration: "4 years",
  },
  {
    id: 4,
    name: "Data Science",
    description: "Learn to extract knowledge and insights from structured and unstructured data.",
    level: "Graduate",
    duration: "2 years",
  },
  {
    id: 5,
    name: "Psychology",
    description: "Explore the human mind and behavior through scientific study and practical applications.",
    level: "Undergraduate",
    duration: "4 years",
  },
]

interface ProgramListProps {
  level: "school" | "college"
}

export function ProgramList({ level }: ProgramListProps) {
  const programs = level === "school" ? schoolPrograms : collegePrograms

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-2 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {programs.map((program) => (
        <Card key={program.id} className="border-indigo-600 border-t-2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-indigo-600">{program.name}</CardTitle>
            <CardDescription className="text-gray-600">{program.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Badge className="bg-red-700 hover:bg-red-600">{program.level}</Badge>
              <span className="text-sm text-indigo-600 font-medium">
                {level === "school" ? `Grades ${program.grades}` : program.duration}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

