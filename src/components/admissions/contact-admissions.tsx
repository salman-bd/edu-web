import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ContactAdmissions() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Contact Admissions</h2>
      <Card>
        <CardHeader>
          <CardTitle>Have questions? Get in touch with our admissions team.</CardTitle>
          <CardDescription>We're here to help you through the application process.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Your email" type="email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your question or comment" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button>Send Message</Button>
        </CardFooter>
      </Card>
    </section>
  )
}

