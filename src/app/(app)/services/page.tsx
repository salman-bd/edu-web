import { Metadata } from 'next'
import ServicesList from '@/components/ServicesList'
import FeaturedService from '@/components/FeaturedService'
import CallToAction from '@/components/CallToAction'

export const metadata: Metadata = {
  title: 'Our Services | Educational Platform',
  description: 'Explore our range of educational services including online courses, tutoring, and learning resources.',
}

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
      <FeaturedService />
      <ServicesList />
      <CallToAction />
    </div>
  )
}

