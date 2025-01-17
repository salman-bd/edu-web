import TeachersHero from '@/components/teachers/teachers-hero'
import TeachersList from '@/components/teachers/teachers-list'
import JoinTeam from '@/components/teachers/join-team'

export default function TeachersPage() {
  return (
    <div className="bg-gray-50">
      <TeachersHero />
      <TeachersList />
      <JoinTeam />
    </div>
  )
}

