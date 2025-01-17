import { ProgramList } from '@/components/programs/program-list'
import { ProgramSearch } from '@/components/programs/program-search'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AcademicProgramsPage() {
  return (
    <div className="container mx-auto py-10 space-y-10">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Academic Programs</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our diverse range of academic programs for both school and college students, designed to challenge, inspire, and prepare you for success.
        </p>
      </header>
      <ProgramSearch />
      <Tabs defaultValue="school" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="school">School (K-12)</TabsTrigger>
          <TabsTrigger value="college">College</TabsTrigger>
        </TabsList>
        <TabsContent value="school">
          <ProgramList level="school" />
        </TabsContent>
        <TabsContent value="college">
          <ProgramList level="college" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

