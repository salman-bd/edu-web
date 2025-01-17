import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, FileText, Headphones } from 'lucide-react'

const services = [
  {
    title: "Online Courses",
    description: "Self-paced learning on a wide range of topics",
    icon: <BookOpen className="h-6 w-6" />,
    badge: "Popular"
  },
  {
    title: "Live Tutoring",
    description: "One-on-one sessions with expert tutors",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Study Resources",
    description: "Comprehensive materials to support your learning",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your queries",
    icon: <Headphones className="h-6 w-6" />,
  }
]

export default function ServicesList() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {services.map((service, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {service.icon}
                <CardTitle>{service.title}</CardTitle>
              </div>
              {service.badge && <Badge>{service.badge}</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>{service.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

