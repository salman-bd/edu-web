import { GraduationCap } from 'lucide-react'

export default function AboutHero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <GraduationCap className="mx-auto h-16 w-16 text-white mb-4" />
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          About Our Institution
        </h1>
        <p className="mt-3 max-w-md mx-auto text-xl text-indigo-200 sm:text-2xl md:mt-5 md:max-w-3xl">
          Empowering minds and shaping futures since 1975
        </p>
      </div>
    </div>
  )
}

