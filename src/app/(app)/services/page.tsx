import ServicesHero from "@/components/services/services-hero"
import ServicesList from "@/components/services/services-list"
import ProgramsOverview from "@/components/services/programs-overview"
import Testimonial from "@/components/services/testimonial"
import ContactCTA from "@/components/services/contact-cta"

export default function ServicesPage() {
  return (
    <div>
      <ServicesHero />
      <ServicesList />
      <ProgramsOverview />
      <Testimonial />
      <ContactCTA />
    </div>
  )
}

