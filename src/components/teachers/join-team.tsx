import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function JoinTeam() {
  return (
    <div className="bg-blue-600">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join Our Teaching Team
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-200">
            We're always looking for passionate educators to join our school and college faculty. If you're dedicated to shaping young minds and fostering a love for learning, we'd love to hear from you.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/careers">View Open Positions</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact" className="text-white">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

