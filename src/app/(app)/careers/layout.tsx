import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Apply - Educational Institution",
  description: "Apply to join out teacher team",
}

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>
}

