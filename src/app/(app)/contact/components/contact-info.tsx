import { Phone, Mail, MapPin } from 'lucide-react'

export default function ContactInfo() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <Phone className="h-6 w-6 text-blue-600 mr-2" />
          <span>(123) 456-7890</span>
        </div>
        <div className="flex items-center">
          <Mail className="h-6 w-6 text-blue-600 mr-2" />
          <a href="mailto:info@schoolcollege.edu" className="hover:underline">info@schoolcollege.edu</a>
        </div>
        <div className="flex items-center">
          <MapPin className="h-6 w-6 text-blue-600 mr-2" />
          <span>123 Education Lane, Learning City, ST 12345</span>
        </div>
      </div>
    </div>
  )
}

