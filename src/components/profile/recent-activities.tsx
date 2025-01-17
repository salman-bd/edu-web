import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getRecentActivities() {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  return [
    { id: 1, activity: "Completed 'Introduction to JavaScript' quiz", date: "2023-06-01" },
    { id: 2, activity: "Submitted project for 'React Basics'", date: "2023-05-28" },
    { id: 3, activity: "Started 'Advanced React Patterns' course", date: "2023-05-25" },
  ]
}

export default async function RecentActivities() {
  const activities = await getRecentActivities()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map(activity => (
            <li key={activity.id} className="border-b pb-2 last:border-b-0">
              <p>{activity.activity}</p>
              <p className="text-sm text-gray-500">{activity.date}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

