import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react'

export default function ContactInfo() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <p>123 Learning Lane, Education City, ED 12345</p>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <p>+1 (555) 123-4567</p>
        </div>
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <p>info@educationalplatform.com</p>
        </div>
        <div className="flex items-center space-x-3">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <p>www.educationalplatform.com</p>
        </div>
        <div className="flex items-center space-x-3">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
        </div>
        <div className="pt-4">
          <Button className="w-full">
            Send us a message
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

