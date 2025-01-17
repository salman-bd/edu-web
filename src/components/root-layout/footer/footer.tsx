import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-lg font-bold">About Us</h2>
            <p className="text-sm">
              We are a leading educational institution committed to providing quality education and fostering academic excellence.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-bold">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/programs">Academic Programs</Link></li>
              <li><Link href="/admissions">Admissions</Link></li>
              <li><Link href="/campus-life">Campus Life</Link></li>
              <li><Link href="/research">Research</Link></li>
              <li><Link href="/alumni">Alumni</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-bold">Contact Us</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                info@educationsite.edu
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                123 Education St, Knowledge City, ST 12345
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-bold">Newsletter</h2>
            <p className="mb-4 text-sm">Stay updated with our latest news and events.</p>
            <form className="space-y-2">
              <Input type="email" placeholder="Your email address" />
              <Button type="submit" className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between space-y-4 text-sm md:flex-row md:space-y-0">
          <p>&copy; 2023 Education Site. All rights reserved.</p>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service">Terms of Service</Link></li>
              <li><Link href="/sitemap">Sitemap</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

