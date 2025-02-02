import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const programs = [
  {
    name: "Elementary Education",
    description: "Building a strong foundation for lifelong learning.",
    href: "/programs/elementary",
  },
  {
    name: "Middle School",
    description: "Nurturing critical thinking and personal growth.",
    href: "/programs/middle-school",
  },
  {
    name: "High School",
    description: "Preparing students for college and beyond.",
    href: "/programs/high-school",
  },
  {
    name: "College Programs",
    description: "Diverse majors and cutting-edge research opportunities.",
    href: "/programs/college",
  },
]

export default function ProgramsOverview() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center px-4">
          <h2 className="text-3xl font-extrabold text-indigo-600 sm:text-4xl">Our Educational Programs</h2>
          <p className="mt-4 text-xl text-gray-600 text-left">
            Explore our comprehensive range of programs designed to support learners at every stage.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <div
              key={program.name}
              className="bg-white overflow-hidden shadow rounded-lg border border-indigo-100 transition-all duration-300 hover:shadow-lg hover:border-indigo-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-indigo-600">{program.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{program.description}</p>
                <div className="mt-4">
                  <Link href={program.href} passHref>
                    <Button variant="link" className="text-red-700 hover:text-red-600 p-0">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

