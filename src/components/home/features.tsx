

import { Book, Users, Trophy, Lightbulb } from 'lucide-react'

const features = [
  {
    name: 'Comprehensive Education',
    description: 'From elementary to college, we provide a seamless educational journey.',
    icon: Book,
  },
  {
    name: 'Expert Faculty',
    description: 'Learn from experienced educators dedicated to your success.',
    icon: Users,
  },
  {
    name: 'Extracurricular Activities',
    description: 'Develop well-rounded skills through our diverse extracurricular programs.',
    icon: Trophy,
  },
  {
    name: 'Innovative Learning',
    description: 'Experience cutting-edge teaching methods and technologies.',
    icon: Lightbulb,
  },
]

export default function Features() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover the advantages of our integrated school and college system.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.name} className="pt-6">
              <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-blue-600 p-3 shadow-lg">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

