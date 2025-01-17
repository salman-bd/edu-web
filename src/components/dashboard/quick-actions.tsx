import { Button } from "@/components/ui/button"
import { Calendar, Users, BookOpen, FileText, Bell, Settings } from 'lucide-react'

export function QuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Button variant="outline" className="w-full justify-start">
        <Calendar className="mr-2 h-4 w-4" />
        Schedule Class
      </Button>
      <Button variant="outline" className="w-full justify-start">
        <Users className="mr-2 h-4 w-4" />
        Manage Students
      </Button>
      <Button variant="outline" className="w-full justify-start">
        <BookOpen className="mr-2 h-4 w-4" />
        Course Catalog
      </Button>
      <Button variant="outline" className="w-full justify-start">
        <FileText className="mr-2 h-4 w-4" />
        Generate Reports
      </Button>
      <Button variant="outline" className="w-full justify-start">
        <Bell className="mr-2 h-4 w-4" />
        Send Notifications
      </Button>
      <Button variant="outline" className="w-full justify-start">
        <Settings className="mr-2 h-4 w-4" />
        System Settings
      </Button>
    </div>
  )
}

