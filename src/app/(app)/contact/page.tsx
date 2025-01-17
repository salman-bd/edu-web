import ContactHero from './components/contact-hero'
import ContactForm from './components/contact-form'
import ContactInfo from './components/contact-info'
import ContactMap from './components/contact-map'

export default function ContactPage() {
  return (
    <div className="bg-gray-50">
      <ContactHero />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactForm />
          <div>
            <ContactInfo />
            <ContactMap />
          </div>
        </div>
      </div>
    </div>
  )
}

