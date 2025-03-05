import { Phone, Mail, MapPin } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-indigo-100 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">Contact Information</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <Phone className="h-6 w-6 text-red-400 mr-2" />
          <span className="text-indigo-600">+88 01784313268</span>
        </div>
        <div className="flex items-center">
          <Mail className="h-6 w-6 text-red-400 mr-2" />
          <a href="mailto:info@schoolcollege.edu" className="text-indigo-600 hover:text-indigo-400 hover:underline">
            cscedubd@gmail.com
          </a>
        </div>
        <div className="flex items-center">
          <MapPin className="h-6 w-6 text-red-400 mr-2" />
          <span className="text-indigo-600">Block-D, Main Road, Shahjalal Upashahar, Sylhet</span>
        </div>
      </div>
    </div>
  )
}

