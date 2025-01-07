import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-2xl">Ready to start learning?</CardTitle>
        <CardDescription className="text-primary-foreground/90">
          Join thousands of students already learning with us
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="secondary" size="lg">
            Sign Up Now
          </Button>
          <Button variant="outline" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

