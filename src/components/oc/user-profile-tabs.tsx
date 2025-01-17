'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, GraduationCap, Trophy, User } from 'lucide-react'

const userProfile = {
  name: "Jane Doe",
  email: "jane.doe@example.edu",
  avatar: "/placeholder.svg?height=100&width=100",
  major: "Computer Science",
  university: "Tech University",
  graduationYear: 2025,
  courses: [
    { name: "Introduction to Programming", progress: 100 },
    { name: "Data Structures", progress: 75 },
    { name: "Web Development", progress: 50 },
    { name: "Machine Learning", progress: 25 },
  ],
  achievements: [
    { name: "Dean's List", date: "Spring 2023" },
    { name: "Hackathon Winner", date: "Summer 2023" },
    { name: "Perfect Attendance", date: "Fall 2023" },
  ],
}

export function UserProfileTabs() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
            <CardDescription>{userProfile.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="text-muted-foreground" />
                <span>Major: {userProfile.major}</span>
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="text-muted-foreground" />
                <span>University: {userProfile.university}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="text-muted-foreground" />
                <span>Expected Graduation: {userProfile.graduationYear}</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="courses">
            <div className="space-y-4">
              {userProfile.courses.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{course.name}</span>
                    <span className="text-muted-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="w-full" />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="achievements">
            <div className="space-y-4">
              {userProfile.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-sm">
                    <Trophy className="w-4 h-4 mr-2" />
                    {achievement.name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{achievement.date}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

