import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Image from "next/image"

export default function FeaturedService() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">Premium Online Courses</CardTitle>
          <Badge variant="secondary">Featured</Badge>
        </div>
        <CardDescription>Learn from industry experts at your own pace</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="mb-4">
              Our premium online courses offer in-depth learning experiences crafted by leading experts in various fields. 
              With interactive content, real-world projects, and personalized feedback, you&apos;ll gain practical skills that 
              are highly valued in today&apos;s job market.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Access to 500+ courses</li>
              <li>Self-paced learning</li>
              <li>Certificate upon completion</li>
              <li>24/7 support</li>
            </ul>
            <Button>
              Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <Image 
              src="/placeholder.svg?height=200&width=300" 
              alt="Online learning illustration" 
              className="rounded-lg shadow-md"
              width={300}
              height={200}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

