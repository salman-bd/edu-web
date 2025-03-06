import type { Metadata } from "next"
import { ApplicationStatusForm } from "@/components/application/ApplicationStatusForm"

export const metadata: Metadata = {
  title: "Check Teaching Application Status",
  description: "Check the status of your teaching application to our institution.",
}

export default function TeacherApplicationStatusPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-600 sm:text-4xl">Check Teaching Application Status</h1>
          <p className="mt-4 text-lg text-gray-600">
            Enter your application ID to check the current status of your teaching application.
          </p>
        </div>

        <ApplicationStatusForm type="teacher" />
      </div>
    </div>
  )
}

