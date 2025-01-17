import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AchievementsSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-8 w-48 mx-auto" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center gap-2">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-10 w-48" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

