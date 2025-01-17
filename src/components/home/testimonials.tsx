import Image from 'next/image'

const testimonials = [
  {
    content: "The integrated school and college system provided me with a seamless educational journey. I felt well-prepared at every stage.",
    author: "Alex Johnson",
    role: "College Graduate",
    image: "/placeholder.svg?height=96&width=96",
  },
  {
    content: "As a parent, I appreciate the consistent quality of education from elementary through high school. It's made a real difference for my children.",
    author: "Sarah Thompson",
    role: "Parent",
    image: "/placeholder.svg?height=96&width=96",
  },
  {
    content: "The transition from high school to college was smooth thanks to the integrated curriculum. I felt ahead of the curve in my freshman year.",
    author: "Michael Lee",
    role: "College Student",
    image: "/placeholder.svg?height=96&width=96",
  },
]

export default function Testimonials() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Community Says
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Hear from our students, alumni, and parents about their experiences.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col bg-gray-50 rounded-lg p-8">
              <blockquote className="flex-1">
                <p className="text-lg text-gray-600">{testimonial.content}</p>
              </blockquote>
              <div className="mt-6 flex items-center">
                <Image
                  className="rounded-full"
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                />
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

