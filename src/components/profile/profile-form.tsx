import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ProfileFormProps {
  userData: UserProfile
  onUpdate: (newData: Partial<UserProfile>) => void
  onCancel: () => void
}

export function ProfileForm({ userData, onUpdate, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState(userData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: new Date(value) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNo">Contact Number</Label>
              <Input id="contactNo" name="contactNo" value={formData.contactNo} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender" value={formData.gender} onValueChange={handleSelectChange('gender')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input 
                id="birthDate" 
                name="birthDate" 
                type="date" 
                value={formData.birthDate.toISOString().split('T')[0]} 
                onChange={handleDateChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Input id="school" name="school" value={formData.school} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sscPassingYear">SSC Passing Year</Label>
              <Input id="sscPassingYear" name="sscPassingYear" value={formData.sscPassingYear} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="college">College</Label>
              <Input id="college" name="college" value={formData.college} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hscPassingYear">HSC Passing Year</Label>
              <Input id="hscPassingYear" name="hscPassingYear" value={formData.hscPassingYear} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Input id="university" name="university" value={formData.university} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input id="graduationYear" name="graduationYear" value={formData.graduationYear} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="achievements">Achievements</Label>
            <Textarea id="achievements" name="achievements" value={formData.achievements} onChange={handleInputChange} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

