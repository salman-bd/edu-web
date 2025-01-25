"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Users, BookOpen, FileText, Bell, Settings } from "lucide-react"
import { motion } from "framer-motion"

export function QuickActions() {
  const actions = [
    { icon: Calendar, label: "Schedule Class" },
    { icon: Users, label: "Manage Students" },
    { icon: BookOpen, label: "Course Catalog" },
    { icon: FileText, label: "Generate Reports" },
    { icon: Bell, label: "Send Notifications" },
    { icon: Settings, label: "System Settings" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {actions.map((action, index) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Button
            variant="outline"
            className="w-full justify-start hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-300"
          >
            <action.icon className="mr-2 h-4 w-4" />
            {action.label}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

