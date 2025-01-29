import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, FileText, Users, CheckCircle, Calendar, Presentation } from "lucide-react"

const schoolSteps = [
  {
    icon: Calendar,
    title: "Schedule a Visit",
    description: "Book a tour of our campus and meet with our admissions team.",
  },
  {
    icon: FileText,
    title: "Submit Application",
    description: "Complete and submit the application form along with required documents.",
  },
  {
    icon: Presentation,
    title: "Entrance Assessment",
    description: "Participate in our age-appropriate entrance assessment.",
  },
  {
    icon: CheckCircle,
    title: "Receive Decision",
    description: "We will review your application and notify you of our decision.",
  },
]

const collegeSteps = [
  {
    icon: ClipboardList,
    title: "Review Requirements",
    description: "Check our admission requirements and ensure you meet the criteria for your chosen program.",
  },
  {
    icon: FileText,
    title: "Prepare Documents",
    description: "Gather all necessary documents, including transcripts, test scores, and letters of recommendation.",
  },
  {
    icon: Users,
    title: "Submit Application",
    description: "Complete and submit your application through our online portal.",
  },
  {
    icon: CheckCircle,
    title: "Await Decision",
    description: "We will review your application and notify you of our decision.",
  },
]

interface AdmissionStepsProps {
  level: "school" | "college"
}

export function AdmissionSteps({ level }: AdmissionStepsProps) {
  const steps = level === "school" ? schoolSteps : collegeSteps

  return (
    <section className="space-y-8 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-indigo-600">Admission Process</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Card key={index} className="border-indigo-600 border-t-4 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <step.icon className="h-10 w-10 mb-2 text-red-700" />
              <CardTitle className="text-xl text-indigo-600">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">{step.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

