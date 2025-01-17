import ServicesHero from './components/services-hero'
import ServicesList from './components/services-list'
import ProgramsOverview from './components/programs-overview'
import Testimonial from './components/testimonial'
import ContactCTA from './components/contact-cta'

export default function ServicesPage() {
  return (
    <div className="bg-gray-50">
      <ServicesHero />
      <ServicesList />
      <ProgramsOverview />
      <Testimonial />
      <ContactCTA />
    </div>
  )
}

