import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award } from 'lucide-react'
import type { AchievementsData } from '@/lib/achievementsData'

interface AchievementsProps {
  getAchievements: () => Promise<AchievementsData | null>
}

export default function Achievements({ getAchievements }: AchievementsProps) {
  const data = use(getAchievements())

  if (!data || data.achievements.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">No achievements available</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center gap-2">
          {data.achievements.map((achievement, index) => (
            <Badge key={index} variant="secondary" className="text-lg py-2 px-4 flex items-center">
              <Award className="mr-2 h-4 w-4 text-yellow-500" />
              {achievement}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function use<T>(promise: Promise<T>): T {
  if (promise.status === 'fulfilled') {
    return promise.value;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else if (promise.status === 'pending') {
    throw promise;
  } else {
    promise.status = 'pending';
    promise.then(
      result => {
        promise.status = 'fulfilled';
        promise.value = result;
      },
      reason => {
        promise.status = 'rejected';
        promise.reason = reason;
      },
    );
    throw promise;
  }
}

