import { Button } from '@/components/ui/button'
import {
  CourseThumbnail,
  CourseThumbnailSkeleton,
} from '@/components/oc/course-thumbnail'
import { courseListSchema } from '@/lib/schema'
import Link from 'next/link'
import { z } from 'zod'

export function CourseList({
  list,
}: {
  list: z.infer<typeof courseListSchema>
}) {
  return (
    <div id="courses" className="relative mb-8 flex flex-col items-center gap-8">
      <h2 className="text-3xl font-bold tracking-tight">Featured Courses</h2>
      {list.data.length > 0 ? (
        <>
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {list.data.map(course => (
              <CourseThumbnail key={course.id} course={course} />
            ))}
          </div>
          <Button asChild size="lg" variant="outline">
            <Link href="/courses">View All Courses</Link>
          </Button>
        </>
      ) : (
        <>
          <div className="grid w-full grid-cols-1 gap-8 opacity-40 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <CourseThumbnailSkeleton key={index} />
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center text-sm">
            <div className="font-medium">No courses found.</div>
            <div className="text-muted-foreground mb-4">
              Check back later for new courses.
            </div>
          </div>
        </>
      )}
    </div>
  )
}

