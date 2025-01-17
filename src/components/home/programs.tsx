import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const programs = [
  { name: 'Elementary School', description: 'Grades K-5', href: '/programs/elementary' },
  { name: 'Middle School', description: 'Grades 6-8', href: '/programs/middle' },
  { name: 'High School', description: 'Grades 9-12', href: '/programs/high' },
  { name: 'College', description: 'Associate and Bachelor\'s Degrees', href: '/programs/college' },
]

export default function Programs() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Programs
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Explore our comprehensive educational offerings.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <div
              key={program.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {program.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {program.description}
                </p>
                <div className="mt-4">
                  <Link
                    href={program.href}
                    className="text-base font-medium text-blue-600 hover:text-blue-500 flex items-center"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-5 w-5" />
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

