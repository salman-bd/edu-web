import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfileSkeleton() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {['Personal', 'Education', 'Courses', 'Achievements'].map((tab) => (
              <TabsTrigger key={tab} value={tab.toLowerCase()}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {['personal', 'education', 'courses', 'achievements'].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="space-y-4">
                {tab === 'personal' && (
                  <>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    ))}
                  </>
                )}
                {tab === 'education' && (
                  <>
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-60" />
                  </>
                )}
                {tab === 'courses' && (
                  <>
                    <Skeleton className="h-4 w-40" />
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </>
                )}
                {tab === 'achievements' && (
                  <>
                    <Skeleton className="h-4 w-40" />
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-8 w-32" />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-6">
          <Skeleton className="h-10 w-28" />
        </div>
      </CardContent>
    </Card>
  )
}

