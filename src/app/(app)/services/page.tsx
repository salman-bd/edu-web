import ServicesHero from "@/components/services/ServicesHero"
import ServicesList from "@/components/services/ServicesList"
import ProgramsOverview from "@/components/services/ProgramsOverview"
import ContactCTA from "@/components/services/ContactCta"

export default function ServicesPage() {
  return (
    <div>
      <ServicesHero />
      <ServicesList />
      <ProgramsOverview />
      <ContactCTA />
    </div>
  )
}

