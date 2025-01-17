import { AdmissionSteps } from '@/components/admissions/admission-steps'
import { ApplicationDeadlines } from '@/components/admissions/application-deadlines'
import { ContactAdmissions } from '@/components/admissions/contact-admissions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



export default function AdmissionsPage() {
  return (
    <div className="container mx-auto py-10 space-y-10">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Admissions</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join our vibrant academic community. Learn about our admission process, requirements, and how to apply for both our school and college programs.
        </p>
      </header>
      <Tabs defaultValue="school" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="school">School (K-12)</TabsTrigger>
          <TabsTrigger value="college">College</TabsTrigger>
        </TabsList>
        <TabsContent value="school">
          <AdmissionSteps level="school" />
          <ApplicationDeadlines level="school" />
        </TabsContent>
        <TabsContent value="college">
          <AdmissionSteps level="college" />
          <ApplicationDeadlines level="college" />
        </TabsContent>
      </Tabs>
      <ContactAdmissions />
    </div>
  )
}

