import Image from 'next/image'

export default function Facilities() {
  const facilities = [
    { name: "State-of-the-art Classrooms", image: "/placeholder.svg?height=200&width=300" },
    { name: "Modern Science Labs", image: "/placeholder.svg?height=200&width=300" },
    { name: "Extensive Library", image: "/placeholder.svg?height=200&width=300" },
    { name: "Sports Complex", image: "/placeholder.svg?height=200&width=300" },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Facilities</h2>
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((facility) => (
            <div key={facility.name} className="bg-white rounded-lg overflow-hidden hover:shadow-md transition duration-300">
              <Image src={facility.image} alt={facility.name} width={300} height={200} className="w-full" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

