'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PersonalInfoSkeleton() {
  return (
    <Card className="md:w-1/2 mx-auto max-w-2xl ">
      <CardHeader className="text-center">
        <Skeleton className="h-8 w-32 mx-auto mb-4" />
        <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
        <Skeleton className="h-8 w-64 mx-auto mb-4" />
        <Skeleton className="h-10 w-32 rounded-full mx-auto" />
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-center gap-2 ">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-40 lg:w-52" />
          </div>
        ))}
        <Skeleton className="h-8 mt-4 w-full" />
      </CardContent>
    </Card>
  )
}

