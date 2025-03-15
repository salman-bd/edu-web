"use client"

import Link from "next/link"
import { Facebook, Linkedin, Mail, Phone, MapPin, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800">
      <div className="container py-12  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-bold text-indigo-600">About Us</h2>
            <p className="text-sm">
              We are a leading educational institution committed to providing quality education and fostering academic
              excellence.
            </p>
            <div className="flex space-x-4">
              {[
                { href: "https://www.facebook.com/cscedubd/", Icon: Facebook },
                { href: "https://x.com/cscsylhet", Icon: X },
                { href: "https://www.linkedin.com/in/cscsylhet/", Icon: Linkedin },
              ].map(({ href, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{Icon.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="mb-4 text-lg font-bold text-indigo-600">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/programs", label: "Academic Programs" },
                { href: "/admissions", label: "Admissions" },
                { href: "/gallery", label: "Gallery" },
                { href: "/magazine", label: "Magazine" },

              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-indigo-600 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-4 text-lg font-bold text-indigo-600">Contact Us</h2>
            <ul className="space-y-2 text-sm">
              {[
                { Icon: Mail, content: "cscedubd@gmail.com" },
                { Icon: Phone, content: "+88 01784313268" },
                { Icon: MapPin, content: "Block-D, Main Road, Shahjalal Upashahar, Sylhet" },
              ].map(({ Icon, content }, index) => (
                <li key={index} className="flex items-center">
                  <Icon className="mr-2 h-4 w-4 text-red-900" />
                  {content}
                </li>
              ))}
            </ul>
          </motion.div>
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="mb-4 text-lg font-bold text-indigo-600">Newsletter</h2>
            <p className="mb-4 text-sm">Stay updated with our latest news and events.</p>
            <form className="space-y-2">
              <Input type="email" placeholder="Your email address" className="bg-white" />
              <Button type="submit" className="w-full bg-red-800 hover:bg-red-700 text-white">
                Subscribe
              </Button>
            </form>
          </motion.div> */}
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between space-y-4 text-sm md:flex-row md:space-y-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <p>&copy; Classic School And College</p>
            <Link href="https://salmanbd.com" target="_blank" className="hover:text-indigo-600">Developed by: Md. Abu Salman</Link>
          </div>

          <nav>
            <ul className="flex space-x-4">
              {[
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms-of-service", label: "Terms of Service" },
                { href: "/sitemap", label: "Sitemap" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-indigo-600 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

