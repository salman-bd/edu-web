export default function Programs() {
    const programs = [
      { name: "Elementary School", description: "Grades K-5" },
      { name: "Middle School", description: "Grades 6-8" },
      { name: "High School", description: "Grades 9-12" },
      { name: "Associate Degrees", description: "2-year college programs" },
      { name: "Bachelor's Degrees", description: "4-year college programs" },
      { name: "Continuing Education", description: "Adult learning courses" },
    ]
  
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Programs</h2>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <div key={program.name} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition duration-300">
                <h3 className="text-xl font-semibold text-gray-900">{program.name}</h3>
                <p className="mt-2 text-gray-500">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  