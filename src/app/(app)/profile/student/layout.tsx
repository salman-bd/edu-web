import type React from "react"

export default function StudentProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-700 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Student Portal</h1>
          <p className="text-indigo-100">Manage your student profile</p>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Education Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

