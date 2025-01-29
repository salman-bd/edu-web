import { Book, Users, Trophy, Lightbulb } from 'lucide-react'
import { motion } from "framer-motion"

const features = [
  {
    name: "Comprehensive Education",
    description: "From elementary to college, we provide a seamless educational journey.",
    icon: Book,
  },
  {
    name: "Expert Faculty",
    description: "Learn from experienced educators dedicated to your success.",
    icon: Users,
  },
  {
    name: "Extracurricular Activities",
    description: "Develop well-rounded skills through our diverse extracurricular programs.",
    icon: Trophy,
  },
  {
    name: "Innovative Learning",
    description: "Experience cutting-edge teaching methods and technologies.",
    icon: Lightbulb,
  },
]

export default function Features() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-indigo-600 sm:text-4xl">Why Choose Us</h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover the advantages of our integrated school and college system.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              className="pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flow-root rounded-lg bg-indigo-600 px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-red-700 p-3 shadow-lg">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-white">{feature.name}</h3>
                  <p className="mt-5 text-base text-indigo-200">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}