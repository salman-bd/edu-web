import type { Metadata } from "next"
import { Suspense } from "react"
import { ApplicationStatusForm } from "@/components/application/ApplicationStatusForm"

export const metadata: Metadata = {
  title: "Check Application Status",
  description: "Check the status of your application to our institution.",
}

// Loading fallback component
function ApplicationStatusFormFallback() {
  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg bg-white shadow-sm animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
      <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  )
}

export default function StudentApplicationStatusPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-600 sm:text-4xl">Check Application Status</h1>
          <p className="mt-4 text-lg text-gray-600">
            Enter your application ID to check the current status of your application.
          </p>
        </div>

        <Suspense fallback={<ApplicationStatusFormFallback />}>
          <ApplicationStatusForm type="student" />
        </Suspense>
      </div>
    </div>
  )
}

