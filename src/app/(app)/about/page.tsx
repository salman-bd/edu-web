import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Book, Users, Award, Lightbulb } from 'lucide-react'

export default function AboutContent() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="">
        <section>
            <h1 className="text-4xl font-bold mb-4">About Our Educational Platform</h1>
            <p className="text-xl text-muted-foreground">
            Empowering learners worldwide through accessible, high-quality education.
            </p>
        </section>

        <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <Card>
            <CardContent className="pt-6">
                <p>
                We are dedicated to breaking down barriers in education and providing learners of all 
                backgrounds with the tools and resources they need to succeed. Our platform offers a 
                diverse range of courses, interactive learning experiences, and a supportive community 
                to help you achieve your educational goals.
                </p>
            </CardContent>
            </Card>
        </section>

        <section>
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
                <Card key={index}>
                <CardHeader>
                    <CardTitle className="flex items-center">
                    {feature.icon}
                    <span className="ml-2">{feature.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                </CardContent>
                </Card>
            ))}
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {team.map((member, index) => (
                <Card key={index}>
                <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">{member.bio}</p>
                    <div className="mt-2">
                    {member.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="mr-1 mt-1">
                        {skill}
                        </Badge>
                    ))}
                    </div>
                </CardContent>
                </Card>
            ))}
            </div>
        </section>
        </div>
    </div>

  )
}

const features = [
  {
    title: "Diverse Course Catalog",
    description: "Explore a wide range of subjects taught by expert instructors.",
    icon: <Book className="h-6 w-6" />,
  },
  {
    title: "Interactive Learning",
    description: "Engage with course material through quizzes, projects, and discussions.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Certificates",
    description: "Earn recognized certificates upon course completion.",
    icon: <Award className="h-6 w-6" />,
  },
  {
    title: "Personalized Learning Paths",
    description: "Tailored recommendations based on your goals and progress.",
    icon: <Lightbulb className="h-6 w-6" />,
  },
]

const team = [
  {
    name: "Dr. Emily Chen",
    role: "Founder & CEO",
    bio: "With over 15 years in EdTech, Emily is passionate about making quality education accessible to all.",
    expertise: ["Education Technology", "Curriculum Design", "Strategic Leadership"],
  },
  {
    name: "Michael Rodriguez",
    role: "Chief Technology Officer",
    bio: "Michael brings 10+ years of experience in building scalable, user-friendly learning platforms.",
    expertise: ["Full-stack Development", "AI in Education", "UX Design"],
  },
  {
    name: "Sarah Okonkwo",
    role: "Head of Content",
    bio: "An experienced educator, Sarah ensures our courses meet the highest standards of quality and engagement.",
    expertise: ["Course Development", "Instructional Design", "Educational Psychology"],
  },
]

