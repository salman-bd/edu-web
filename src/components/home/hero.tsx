import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Welcome to Our School & College
          </h1>
          <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto">
            Empowering minds and shaping futures through quality education from elementary to college level.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/programs">Explore Programs</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

