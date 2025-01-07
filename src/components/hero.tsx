import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="from-muted/20 to-muted/50 relative flex h-96 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b">
      <div className="z-10 flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Expand Your Knowledge
        </h1>
        <p className="text-muted-foreground mb-4 max-w-[600px] text-lg">
          Discover a world of learning with our expert-led courses. Start your journey to mastery today.
        </p>
        <Button asChild size="lg">
          <Link href="#courses">Explore Courses</Link>
        </Button>
      </div>
    </div>
  )
}

