import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ContactCTA() {
  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to Join Our Community?
        </h2>
        <p className="mt-4 text-xl text-blue-200">
          Contact us to learn more about our programs and admission process.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

