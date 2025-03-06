'use client'


import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    content:
      "The integrated school and college system provided me with a seamless educational journey. I felt well-prepared at every stage.",
    author: "Name.....",
    role: "College Graduate",
    image: "/placeholder.svg?height=96&width=96",
  },
  {
    content:
      "As a parent, I appreciate the consistent quality of education from elementary through high school. It's made a real difference for my children.",
    author: "Name.....",
    role: "Parent",
    image: "/placeholder.svg?height=96&width=96",
  },
  {
    content:
      "The transition from high school to college was smooth thanks to the integrated curriculum. I felt ahead of the curve in my freshman year.",
    author: "Name.....",
    role: "College Student",
    image: "/placeholder.svg?height=96&width=96",
  },
]

export default function Testimonials() {
  return (
    <div className="py-24 ">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center p-4 py-8 bg-indigo-600 rounded-md">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">What Our Community Says</h2>
          <p className="mt-4 text-xl text-white text-left">
            Hear from our students, alumni, and parents about their experiences.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-lg border-red-700 border-t-4 h-full">
                <CardContent className="p-6">
                  <blockquote className="text-lg text-gray-600 mb-4">&quot;{testimonial.content}&quot;</blockquote>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 border-2 border-red-700">
                      <AvatarImage src={testimonial.image} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="text-base font-medium text-indigo-600">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}