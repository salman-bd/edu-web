import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactAdmissions() {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight text-indigo-600">Contact Admissions</h2>
      <Card className="border-indigo-600 border-t-4">
        <CardHeader>
          <CardTitle className="text-2xl text-indigo-600">
            Have questions? Get in touch with our admissions team.
          </CardTitle>
          <CardDescription className="text-lg">We're here to help you through the application process.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-indigo-600">
                  Name
                </Label>
                <Input id="name" placeholder="Your name" className="border-indigo-200 focus:border-indigo-600" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-indigo-600">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Your email"
                  type="email"
                  className="border-indigo-200 focus:border-indigo-600"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message" className="text-indigo-600">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Your question or comment"
                  className="border-indigo-200 focus:border-indigo-600"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="bg-red-700 hover:bg-red-600 text-white">Send Message</Button>
        </CardFooter>
      </Card>
    </section>
  )
}

