import { EnrollButton } from '@/components/oc/enroll-button'
import { courseSchema } from '@/lib/schema'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { z } from 'zod'

export function CourseThumbnail({
  course,
}: {
  course: z.infer<typeof courseSchema>
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-xl">
          <Image
            src={course.image ?? '/placeholder.svg'}
            alt={course.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="line-clamp-2 mb-2">{course.name}</CardTitle>
        <p className="text-muted-foreground line-clamp-3 text-sm">{course.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <Badge variant="secondary">{course.category}</Badge>
        <div className="text-muted-foreground">{course.duration}</div>
      </CardFooter>
      <CardFooter className="p-4 pt-0">
        <EnrollButton priceId={course.price.id} />
        <div className="text-muted-foreground ml-auto">
          {course.price.display_amount}
        </div>
      </CardFooter>
    </Card>
  )
}

export function CourseThumbnailSkeleton() {
  return <div className="bg-muted aspect-[4/3] rounded-xl" />
}

