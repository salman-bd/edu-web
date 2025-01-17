'use client'

import { useState } from 'react'
import { ProfileHeader } from './profile-header'
import { ProfileInfo } from './profile-info'
import { ProfileForm } from './profile-form'

// Mock data based on the UserProfile interface
const initialUserData: UserProfile = {
  name: 'Jane Doe',
  avatar: '/placeholder.svg?height=128&width=128',
  email: 'jane.doe@example.com',
  contactNo: '+1 (555) 123-4567',
  school: 'Springfield Elementary',
  sscPassingYear: '2010',
  college: 'Springfield High',
  hscPassingYear: '2012',
  university: 'Springfield University',
  graduationYear: '2016',
  gender: 'Female',
  birthDate: new Date('1998-05-15'),
  isVerified: true,
  achievements: 'Dean\'s List 2014-2016, Hackathon Winner 2015',
  updatedAt: new Date('2023-06-01'),
}

export function UserProfile() {
  const [userData, setUserData] = useState<UserProfile>(initialUserData)
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdateUser = (newData: Partial<UserProfile>) => {
    setUserData((prevData) => ({ ...prevData, ...newData, updatedAt: new Date() }))
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <ProfileHeader name={userData.name} avatar={userData.avatar} isVerified={userData.isVerified} />
      {isEditing ? (
        <ProfileForm userData={userData} onUpdate={handleUpdateUser} onCancel={() => setIsEditing(false)} />
      ) : (
        <ProfileInfo userData={userData} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  )
}

