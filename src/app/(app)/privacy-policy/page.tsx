"use client"

import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-extrabold text-indigo-600 sm:text-4xl mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: March 27, 2025</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
            <p className="text-gray-600">
              Classic School And College ("we," "our," or "us") respects your privacy and is committed to protecting
              your personal data. This privacy policy will inform you about how we look after your personal data when
              you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We may collect, use, store, and transfer different kinds of personal data about you which we have grouped
              together as follows:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Identity Data: includes first name, last name, username or similar identifier, date of birth.</li>
              <li>Contact Data: includes billing address, delivery address, email address, and telephone numbers.</li>
              <li>
                Technical Data: includes internet protocol (IP) address, your login data, browser type and version, time
                zone setting and location, browser plug-in types and versions, operating system and platform, and other
                technology on the devices you use to access this website.
              </li>
              <li>Usage Data: includes information about how you use our website, products, and services.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal
              data in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>To register you as a new student or parent.</li>
              <li>To process and deliver educational services.</li>
              <li>To manage our relationship with you.</li>
              <li>To improve our website, products/services, marketing, or customer relationships.</li>
              <li>To recommend products or services that may be of interest to you.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Security</h2>
            <p className="text-gray-600">
              We have put in place appropriate security measures to prevent your personal data from being accidentally
              lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to
              your personal data to those employees, agents, contractors, and other third parties who have a business
              need to know.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Legal Rights</h2>
            <p className="text-gray-600 mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data,
              including the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600">Email: cscedubd@gmail.com</p>
              <p className="text-gray-600">Phone: +88 01784313268</p>
              <p className="text-gray-600">Address: Block-D, Main Road, Shahjalal Upashahar, Sylhet</p>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  )
}

