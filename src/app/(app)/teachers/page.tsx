import TeachersList from "@/components/teachers/TeachersList"
import type { TeacherProfileType } from "@/types/profile"
import clientPromise from "@/lib/mongodb"

async function getTeachers(): Promise<TeacherProfileType[]> {
  try {
    const client = await clientPromise
    const db = client.db("education_app")
    const teachers = await db.collection("profiles").find({ type: "teacher" }).sort({ createdAt: -1 }).toArray()

    return JSON.parse(JSON.stringify(teachers))
  } catch (error) {
    console.error("Failed to fetch teachers:", error)
    return []
  }
}

export default async function TeachersPage() {
  const teachers = await getTeachers()

  return (
    <div className="container py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">Our Teachers</h1>
        <p className="text-muted-foreground">
          Browse our qualified teachers and find the perfect match for your learning needs
        </p>
      </div>

      <TeachersList teachers={teachers} />
    </div>
  )
}

