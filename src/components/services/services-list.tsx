import {
  Book,
  Users,
  ClapperboardIcon as ChalkboardTeacher,
  Microscope,
  Music,
  ShoppingBasketIcon as Basketball,
  Globe,
  Code,
} from "lucide-react"

const services = [
  {
    name: "Academic Programs",
    description: "Comprehensive curricula from elementary to college level.",
    icon: Book,
  },
  {
    name: "Student Counseling",
    description: "Guidance for academic and personal development.",
    icon: Users,
  },
  {
    name: "Tutoring Services",
    description: "One-on-one and group tutoring for all subjects.",
    icon: ChalkboardTeacher,
  },
  {
    name: "Language Programs",
    description: "Multilingual education and ESL support.",
    icon: Globe,
  }
]

export default function ServicesList() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-indigo-600 sm:text-4xl">Comprehensive Educational Services</h2>
          <p className="mt-4 text-xl text-gray-600">
            We offer a wide range of services to support your educational journey at every stage.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.name} className="pt-6">
              <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8 transition-all duration-300 hover:shadow-lg hover:bg-white">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-indigo-600 p-3 shadow-lg">
                      <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-indigo-600">{service.name}</h3>
                  <p className="mt-5 text-base text-gray-500">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

