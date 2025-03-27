"use client"

import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-extrabold text-indigo-600 sm:text-4xl mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: March 27, 2025</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
            <p className="text-gray-600">
              These terms and conditions outline the rules and regulations for the use of Classic School And College's
              website and services. By accessing this website, we assume you accept these terms and conditions in full.
              Do not continue to use our website if you do not accept all of the terms and conditions stated on this
              page.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Intellectual Property Rights</h2>
            <p className="text-gray-600 mb-4">
              Unless otherwise stated, we own the intellectual property rights for all material on this website. All
              intellectual property rights are reserved. You may view and/or print pages from the website for your own
              personal use subject to restrictions set in these terms and conditions.
            </p>
            <p className="text-gray-600">You must not:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Republish material from this website</li>
              <li>Sell, rent, or sub-license material from this website</li>
              <li>Reproduce, duplicate, or copy material from this website</li>
              <li>Redistribute content from this website</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User Accounts</h2>
            <p className="text-gray-600 mb-4">
              When you create an account with us, you guarantee that the information you provide is accurate, complete,
              and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate
              termination of your account on the service.
            </p>
            <p className="text-gray-600 mb-4">
              You are responsible for maintaining the confidentiality of your account and password, including but not
              limited to the restriction of access to your computer and/or account. You agree to accept responsibility
              for any and all activities or actions that occur under your account and/or password.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Educational Services</h2>
            <p className="text-gray-600 mb-4">
              Classic School And College provides educational services subject to the following conditions:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Enrollment is subject to availability and meeting admission requirements.</li>
              <li>Tuition and fees must be paid according to the published schedule.</li>
              <li>Students must adhere to the code of conduct and academic policies.</li>
              <li>The institution reserves the right to modify curriculum, schedules, and policies as necessary.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600">
              In no event shall Classic School And College, nor any of its officers, directors, and employees, be liable
              for anything arising out of or in any way connected with your use of this website, whether such liability
              is under contract, tort, or otherwise. Classic School And College, including its officers, directors, and
              employees, shall not be liable for any indirect, consequential, or special liability arising out of or in
              any way related to your use of this website.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Governing Law</h2>
            <p className="text-gray-600">
              These terms and conditions are governed by and construed in accordance with the laws of Bangladesh, and
              you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. By continuing to access or use our service after
              any revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600">If you have any questions about these Terms, please contact us at:</p>
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

