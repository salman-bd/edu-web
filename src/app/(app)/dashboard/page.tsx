'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, BookOpen, Trophy, Clock } from 'lucide-react'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession(); 

  console.log("Session in dashbosrd page: ", session);

  const [authentication, setAuthentication] = useState(false);
  const [currentSession, setCurrentSession] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {  
    const storedSession = localStorage.getItem('userSession');  
    if (storedSession) {  
      setCurrentSession(JSON.parse(storedSession));  
      setAuthentication(true);  
      return;
    } else if (status === 'authenticated') {  
      setAuthentication(true);
    } else if (authentication && !storedSession) {
      localStorage.setItem('userSession', JSON.stringify(session)); 
      return;
    }
 } , [authentication]); 

  const sessionData = currentSession?.user;
  console.log("Session Data in dashbosrd page: ", sessionData);
  
    
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <Avatar className="h-20 w-20">
          <AvatarImage src={sessionData?.image} alt={sessionData?.name} />
          <AvatarFallback className="bg-violet-600 text-white">{sessionData?.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {sessionData?.name}!
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={BookOpen} title="Courses" value="4" description="Enrolled" />
        <StatCard icon={Trophy} title="Achievements" value="12" description="Earned" />
        <StatCard icon={Clock} title="Study Time" value="32h" description="This week" />
        <StatCard icon={CalendarDays} title="Next Exam" value="5" description="Days left" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CourseProgress />
        <UpcomingAssignments />
      </div>

      <RecentActivity />
    </div>
  )
}

function StatCard({ icon: Icon, title, value, description }: { icon: any, title: string, value: string, description: string }) {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <Icon className="h-8 w-8 text-primary mr-4" />
        <div>
          <h2 className="text-2xl font-bold">{value}</h2>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function CourseProgress() {
  const courses = [
    { name: "Introduction to React", progress: 75 },
    { name: "Advanced JavaScript", progress: 50 },
    { name: "CSS Mastery", progress: 90 },
    { name: "Web Accessibility", progress: 30 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{course.name}</span>
                <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function UpcomingAssignments() {
  const assignments = [
    { name: "React Hooks Essay", dueDate: "2023-07-15", course: "Introduction to React" },
    { name: "JavaScript Quiz", dueDate: "2023-07-18", course: "Advanced JavaScript" },
    { name: "CSS Layout Project", dueDate: "2023-07-20", course: "CSS Mastery" },
    { name: "Accessibility Audit", dueDate: "2023-07-22", course: "Web Accessibility" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {assignments.map((assignment, index) => (
            <li key={index} className="bg-gray-50 p-3 rounded-lg">
              <h3 className="font-semibold text-gray-800">{assignment.name}</h3>
              <p className="text-sm text-gray-600">{assignment.course}</p>
              <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function RecentActivity() {
  const activities = [
    { action: "Completed lesson", subject: "React Components", timestamp: "2 hours ago" },
    { action: "Submitted assignment", subject: "JavaScript Basics Quiz", timestamp: "1 day ago" },
    { action: "Started course", subject: "CSS Flexbox", timestamp: "3 days ago" },
    { action: "Earned achievement", subject: "JavaScript Master", timestamp: "1 week ago" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.subject}</p>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

