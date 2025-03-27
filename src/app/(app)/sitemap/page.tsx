"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Sitemap() {
  const sitemapSections = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Academic Programs", href: "/programs" },
        { name: "Admissions", href: "/admissions" },
        { name: "Services", href: "/services" },
        { name: "Teachers", href: "/teachers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Academic Programs",
      links: [
        { name: "Elementary School", href: "/programs/elementary" },
        { name: "Middle School", href: "/programs/middle" },
        { name: "High School", href: "/programs/high" },
        { name: "College", href: "/programs/college" },
      ],
    },
    {
      title: "Student Resources",
      links: [
        { name: "Gallery", href: "/gallery" },
        { name: "Magazine", href: "/magazine" },
        { name: "Apply Now", href: "/application/student" },
      ],
    },
    {
      title: "Legal & Information",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms-of-service" },
        { name: "Sitemap", href: "/sitemap" },
      ],
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-extrabold text-indigo-600 sm:text-4xl mb-8">Sitemap</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {sitemapSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
            >
              <Card className="h-full border-indigo-600 border-t-2">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-indigo-600 mb-4">{section.title}</h2>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name} className="group">
                        <Link
                          href={link.href}
                          className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
                        >
                          <ArrowRight className="h-4 w-4 mr-2 text-red-800 group-hover:text-indigo-600 transition-colors" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-indigo-600 mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-600 mb-4">
            If you can't find the page you're looking for, please contact our support team for assistance.
          </p>
          <div className="flex items-center text-gray-600">
            <p>Email: cscedubd@gmail.com</p>
            <span className="mx-2">•</span>
            <p>Phone: +88 01784313268</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

