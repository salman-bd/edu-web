import { Mail } from 'lucide-react'

export default function ContactHero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <Mail className="mx-auto h-16 w-16 text-blue-200" />
          <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Contact Us
          </h1>
          <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto">
            We're here to answer your questions and help you on your educational journey.
          </p>
        </div>
      </div>
    </div>
  )
}

