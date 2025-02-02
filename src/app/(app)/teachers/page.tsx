import TeachersHero from '@/components/teachers/TeachersHero'
import TeachersList from '@/components/teachers/TeachersList'
import JoinTeam from '@/components/teachers/JoinTeam'

export default function TeachersPage() {
  return (
    <div className="bg-gray-50">
      <TeachersHero />
      <TeachersList />
      <JoinTeam />
    </div>
  )
}

