import { ErrorBoundary } from "react-error-boundary"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong in the dashboard layout</div>}>
      <div>{children}</div>
    </ErrorBoundary>
  )
}

