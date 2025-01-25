import { Lightbulb } from "lucide-react"

export default function ServicesHero() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <Lightbulb className="mx-auto h-16 w-16 text-red-400" />
          <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl md:text-6xl">Our Services</h1>
          <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-indigo-100">
            Discover the comprehensive range of educational services we offer to support your learning journey.
          </p>
        </div>
      </div>
    </div>
  )
}

