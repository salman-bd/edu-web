import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function EducationalInfoSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-8 w-64 mx-auto" />
      </CardHeader>
      <CardContent className="grid gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

