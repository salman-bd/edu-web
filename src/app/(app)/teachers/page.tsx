import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Teacher {
  id: number;
  name: string;
  subject: string;
  bio: string;
  imageUrl: string;
}

const teachers: Teacher[] = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    subject: "Mathematics",
    bio: "Dr. Smith has been teaching mathematics for over 15 years and specializes in calculus and linear algebra.",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Prof. John Doe",
    subject: "Literature",
    bio: "Prof. Doe is an expert in 20th century American literature and creative writing.",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Ms. Emily Brown",
    subject: "Computer Science",
    bio: "Ms. Brown brings industry experience to her classes, focusing on web development and AI.",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Dr. Michael Lee",
    subject: "Physics",
    bio: "Dr. Lee's research in quantum mechanics informs his engaging approach to teaching physics.",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
]

export default function TeachersPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Teaching Staff</h1>
      <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
        Meet our dedicated team of educators who are passionate about helping students achieve their full potential.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={teacher.imageUrl} alt={teacher.name} />
                <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{teacher.name}</CardTitle>
                <CardDescription>{teacher.subject}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{teacher.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

