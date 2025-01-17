'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface StudentData {
  name: string
  email: string
  avatar: string
  institution: 'school' | 'college'
  gradeOrYear: string
  majorOrSubjects: string
  achievements: string
}

export function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [studentData, setStudentData] = useState<StudentData>({
    name: 'Jane Doe',
    email: 'jane.doe@example.edu',
    avatar: 'https://github.com/shadcn.png',
    institution: 'school',
    gradeOrYear: '10th Grade',
    majorOrSubjects: 'Mathematics, Science, Literature',
    achievements: 'Honor Roll (2022-2023), Science Fair Winner (2023), Debate Team Captain',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setStudentData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setStudentData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated data to your backend
    console.log('Updated student data:', studentData)
    setIsEditing(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Student Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={studentData.avatar} alt={studentData.name} />
            <AvatarFallback>{studentData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{studentData.name}</h2>
            <p className="text-gray-500">{studentData.email}</p>
          </div>
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={studentData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={studentData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="institution">Institution</Label>
              <Select
                name="institution"
                value={studentData.institution}
                onValueChange={(value) => handleSelectChange('institution', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select institution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="gradeOrYear">
                {studentData.institution === 'school' ? 'Grade' : 'Year'}
              </Label>
              <Input
                id="gradeOrYear"
                name="gradeOrYear"
                value={studentData.gradeOrYear}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="majorOrSubjects">
                {studentData.institution === 'school' ? 'Subjects' : 'Major'}
              </Label>
              <Input
                id="majorOrSubjects"
                name="majorOrSubjects"
                value={studentData.majorOrSubjects}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="achievements">Achievements</Label>
              <Textarea
                id="achievements"
                name="achievements"
                value={studentData.achievements}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Institution</h3>
              <p className="capitalize">{studentData.institution}</p>
            </div>
            <div>
              <h3 className="font-semibold">
                {studentData.institution === 'school' ? 'Grade' : 'Year'}
              </h3>
              <p>{studentData.gradeOrYear}</p>
            </div>
            <div>
              <h3 className="font-semibold">
                {studentData.institution === 'school' ? 'Subjects' : 'Major'}
              </h3>
              <p>{studentData.majorOrSubjects}</p>
            </div>
            <div>
              <h3 className="font-semibold">Achievements</h3>
              <p>{studentData.achievements}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isEditing ? (
          <div className="flex justify-end space-x-2 w-full">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </CardFooter>
    </Card>
  )
}

