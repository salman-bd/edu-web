import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import ContactInfo from '@/components/ContactInfo'
import Map from '@/components/Map'

export const metadata: Metadata = {
  title: 'Contact Us | Educational Platform',
  description: 'Get in touch with our team for any questions or support.',
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ContactForm />
        </div>
        <div className="space-y-8">
          <ContactInfo />
          <Map />
        </div>
      </div>
    </div>
  )
}

