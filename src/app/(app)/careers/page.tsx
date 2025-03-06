import type { Metadata } from "next"
import CareersPageClient from "./CareersPageClient"

export const metadata: Metadata = {
  title: "Careers - Join Our Teaching Team",
  description: "Apply to join our team of passionate educators committed to excellence in teaching and learning.",
}

export const dynamic = "force-dynamic"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">Join Our Teaching Team</h1>
          <p className="text-left md:text-center mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re looking for passionate educators who are committed to excellence in teaching and learning. Submit
            your application below to be considered for teaching positions at our institution.
          </p>
        </div>

        {/* Client-side only rendering for the form */}
        <CareersPageClient />
      </div>
    </div>
  )
}

