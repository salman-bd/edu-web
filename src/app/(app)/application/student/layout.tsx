import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Apply - Educational Institution",
  description: "Apply for admission to our educational programs",
}

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>
}

