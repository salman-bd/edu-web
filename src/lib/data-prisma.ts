import { cache } from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export interface PersonalInfoData {
  avatar: string
  name: string
  email: string
  contactNo: string
  birthDate: string
  gender: string
  designation: string
}

export interface EducationalInfoData {
  institutionName: string
  grade: string
  school: string
  sscPassingYear: string
  college: string
  hscPassingYear: string
  university: string
  graduationYear: string
}

export interface AchievementsData {
  achievements: string[]
}

async function getSession() {
  return await getServerSession(authOptions)
}

export const getPersonalInfo = cache(async (): Promise<PersonalInfoData | null> => {
  const session = await getSession()
  if (!session?.user?.email) return null

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      avatar: true,
      name: true,
      email: true,
      contactNo: true,
      birthDate: true,
      gender: true,
      designation: true,
    },
  })

  if (!user) return null

  return {
    avatar: user.avatar || '/placeholder.svg?height=100&width=100',
    name: user.name || '',
    email: user.email,
    contactNo: user.contactNo || '',
    birthDate: user.birthDate ? user.birthDate.toISOString().split('T')[0] : '',
    gender: user.gender || '',
    designation: user.designation || '',
  }
})

export const getEducationalInfo = cache(async (): Promise<EducationalInfoData | null> => {
  const session = await getSession()
  if (!session?.user?.email) return null

  const educationInfo = await prisma.educationalInfo.findUnique({
    where: { userEmail: session.user.email },
  })

  if (!educationInfo) return null

  return {
    institutionName: educationInfo.institutionName || '',
    grade: educationInfo.grade || '',
    school: educationInfo.school || '',
    sscPassingYear: educationInfo.sscPassingYear || '',
    college: educationInfo.college || '',
    hscPassingYear: educationInfo.hscPassingYear || '',
    university: educationInfo.university || '',
    graduationYear: educationInfo.graduationYear || '',
  }
})

export const getAchievements = cache(async (): Promise<AchievementsData | null> => {
  const session = await getSession()
  if (!session?.user?.email) return null

  const achievements = await prisma.achievement.findMany({
    where: { userEmail: session.user.email },
    select: { title: true },
  })

  return {
    achievements: achievements.map(a => a.title),
  }
})

