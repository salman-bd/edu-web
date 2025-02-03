import { Suspense } from "react"
import Dashboard from "@/components/dashboard/Dashboard"
import { ErrorBoundary } from "react-error-boundary"


export default function DashboardPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 space-y-16">
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Dashboard />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

