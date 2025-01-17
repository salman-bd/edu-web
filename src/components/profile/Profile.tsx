'use client'  

import { useEffect, useState } from 'react'  
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"  
import { Button } from "@/components/ui/button"  
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"  
import { Progress } from "@/components/ui/progress"  
import { Badge } from "@/components/ui/badge"  
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"  
import { BookOpen, GraduationCap, Trophy, User } from 'lucide-react'  
import { useRouter } from 'next/navigation'  

export default function Profile() {  
  const router = useRouter();  

  

  const user = {  
    name: profileData.name,  
    avatar: profileData.avatar,  
    email: profileData.email,  
    contactNo: profileData.contactNo,  
    school: profileData.school,  
    sscPassingYear: profileData.sscPassingYear,  
    college: profileData.college,  
    hscPassingYear: profileData.hscPassingYear,  
    university: profileData.university,  
    graduationYear: profileData.graduationYear,  
    gender: profileData.gender,  
    birthDate: profileData.birthDate,
    isVerified: profileData.isVerified,
    achievements: profileData.achievements || [],  
    updatedAt: profileData.updatedAt,  
  };


  const profileCompletionPageRedirect = () => {  
    router.replace('/profile-completion');  
  }  

  return (  
    <>  
      <Card className="w-full max-w-4xl mx-auto">  
        <CardHeader>  
          <div className="flex items-center space-x-4">  
            <Avatar className="w-20 h-20">  
              <AvatarImage src={user.avatar} alt={user.name} />  
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>  
            </Avatar>  
            <div>  
              <CardTitle className="text-2xl">{user.name}</CardTitle>  
              <CardDescription>{user.email}</CardDescription>  
            </div>  
          </div>  
        </CardHeader>  
        <CardContent>  
          <Tabs defaultValue="personal" className="w-full">  
            <TabsList className="grid w-full grid-cols-4">  
              <TabsTrigger value="personal">Personal</TabsTrigger>  
              <TabsTrigger value="education">Education</TabsTrigger>  
              <TabsTrigger value="courses">Courses</TabsTrigger>  
              <TabsTrigger value="achievements">Achievements</TabsTrigger>  
            </TabsList>  
            <TabsContent value="personal">  
              <div className="space-y-4">  
                <div className="flex items-center space-x-2">  
                  <User className="text-muted-foreground" />  
                </div>  
                <div className="flex items-center space-x-2">  
                  <GraduationCap className="text-muted-foreground" />  
                  <span>University: {user.university}</span>  
                </div>  
                <div className="flex items-center space-x-2">  
                  <BookOpen className="text-muted-foreground" />  
                  <span>Expected Graduation: {user.graduationYear}</span>  
                </div>  
              </div>  
            </TabsContent>  
            <TabsContent value="education">  
              <div className="space-y-4">  
                <h3 className="text-lg font-semibold">Educational Progress</h3>  
                <Progress value={progress} className="w-full" />  
              </div>  
            </TabsContent>  
            <TabsContent value="courses">  
              <div className="space-y-4">  
                <h3 className="text-lg font-semibold">Current Courses</h3>  
                <ul className="list-disc list-inside space-y-2">  
                  {/* Render current courses here */}  
                </ul>  
              </div>  
            </TabsContent>  
            <TabsContent value="achievements">  
              <div className="space-y-4">  
                <h3 className="text-lg font-semibold">Achievements</h3>  
                <div className="flex flex-wrap gap-2">  
                  {user.achievements.map((achievement, index) => (  
                    <Badge key={index} variant="secondary">  
                      <Trophy className="w-4 h-4 mr-2" />  
                      {achievement}  
                    </Badge>  
                  ))}  
                </div>  
              </div>  
            </TabsContent>  
          </Tabs>  
          <div className="mt-6">  
            <Button onClick={profileCompletionPageRedirect}>Edit Profile</Button>  
          </div>  
        </CardContent>  
      </Card>  
    </>  
  );  
}