import type React from "react"
export default function TeacherProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-700 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Teacher Portal</h1>
          <p className="text-indigo-100">Manage your teaching profile</p>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

