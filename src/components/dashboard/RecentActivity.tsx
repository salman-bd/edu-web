"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const activities = [
  {
    name: "Olivia Martin",
    action: 'Submitted assignment: "Introduction to Calculus"',
    time: "Just now",
    avatar: "/avatars/01.png",
    initials: "OM",
  },
  {
    name: "Jackson Lee",
    action: 'Joined "Physics 101" course',
    time: "5m ago",
    avatar: "/avatars/02.png",
    initials: "JL",
  },
  {
    name: "Isabella Nguyen",
    action: 'Created a new discussion: "Study Group for Midterms"',
    time: "20m ago",
    avatar: "/avatars/03.png",
    initials: "IN",
  },
  {
    name: "William Kim",
    action: "Scheduled office hours for next week",
    time: "1h ago",
    avatar: "/avatars/04.png",
    initials: "WK",
  },
]

export default function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.name}
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar} alt="Avatar" />
            <AvatarFallback>{activity.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.name}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="ml-auto font-medium text-indigo-600">{activity.time}</div>
        </motion.div>
      ))}
    </div>
  )
}

