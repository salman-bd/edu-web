import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ClipboardList, FileText, Users, CheckCircle, Calendar, Presentation } from 'lucide-react'

const schoolSteps = [
  {
    icon: Calendar,
    title: 'Schedule a Visit',
    description: 'Book a tour of our campus and meet with our admissions team.',
  },
  {
    icon: FileText,
    title: 'Submit Application',
    description: 'Complete and submit the application form along with required documents.',
  },
  {
    icon: Presentation,
    title: 'Entrance Assessment',
    description: 'Participate in our age-appropriate entrance assessment.',
  },
  {
    icon: CheckCircle,
    title: 'Receive Decision',
    description: 'We will review your application and notify you of our decision.',
  },
]

const collegeSteps = [
  {
    icon: ClipboardList,
    title: 'Review Requirements',
    description: 'Check our admission requirements and ensure you meet the criteria for your chosen program.',
  },
  {
    icon: FileText,
    title: 'Prepare Documents',
    description: 'Gather all necessary documents, including transcripts, test scores, and letters of recommendation.',
  },
  {
    icon: Users,
    title: 'Submit Application',
    description: 'Complete and submit your application through our online portal.',
  },
  {
    icon: CheckCircle,
    title: 'Await Decision',
    description: 'We will review your application and notify you of our decision.',
  },
]

interface AdmissionStepsProps {
  level: 'school' | 'college'
}

export function AdmissionSteps({ level }: AdmissionStepsProps) {
  const steps = level === 'school' ? schoolSteps : collegeSteps

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Admission Process</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Card key={index}>
            <CardHeader>
              <step.icon className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{step.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

