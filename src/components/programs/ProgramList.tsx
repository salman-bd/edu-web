import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const schoolPrograms = [
  {
    id: 1,
    name: "Elementary Education",
    description: "Foundational learning for grades K-5, focusing on core subjects and social development.",
    level: "elementary",
    grades: "K-5",
  },
  {
    id: 2,
    name: "Middle School Program",
    description:
      "Comprehensive education for grades 6-8, preparing students for high school with a focus on critical thinking and personal growth.",
    level: "middle",
    grades: "6-8",
  },
  {
    id: 3,
    name: "High School Program",
    description:
      "College preparatory curriculum for grades 9-12, offering a wide range of subjects, electives, and advanced placement courses.",
    level: "high",
    grades: "9-12",
  },
  {
    id: 4,
    name: "College Preparation Program",
    description:
      "Specialized program for grades 11-12, focusing on college readiness, SAT/ACT preparation, and guidance through the college application process.",
    level: "college",
    grades: "11-12",
  },
]

interface ProgramListProps {
  level: "elementary" | "middle" | "high" | "college"
}

export function ProgramList({ level }: ProgramListProps) {
  const programs = schoolPrograms.filter((program) => program.level === level)

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <Card
              key={program.id}
              className="border-indigo-600 border-t-2 hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl text-indigo-600">{program.name}</CardTitle>
                <CardDescription className="text-gray-600 mt-2">{program.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mt-4">
                  <Badge className="bg-indigo-600 hover:bg-indigo-700">{program.level}</Badge>
                  <span className="text-sm text-indigo-600 font-medium">Grades {program.grades}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}