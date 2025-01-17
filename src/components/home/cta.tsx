import Link from 'next/link'
import { Button } from '@/components/ui/button'



export default function CTA() {
  return (
    <div className="bg-blue-600">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to start your educational journey?</span>
          <span className="block text-blue-200">Join our school and college community today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Button asChild size="lg">
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

