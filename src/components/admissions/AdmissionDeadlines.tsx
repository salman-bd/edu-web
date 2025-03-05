import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface SchoolDeadline {
  program: string
  deadline: string
}

interface CollegeDeadline {
  program: string
  deadline: string
}

const schoolDeadlines: SchoolDeadline[] = [
  { program: "Elementary School (K-5)", deadline: "March 1" },
  { program: "Middle School (6-8)", deadline: "March 1" },
  { program: "High School (9-10)", deadline: "March 1" },
]

const collegeDeadlines: CollegeDeadline[] = [
  { program: "Science Group", deadline: "It may vary" },
  { program: "Humanities Group", deadline: "It may vary" },
  { program: "Business Studies Group", deadline: "It may vary" },
]

interface ApplicationDeadlinesProps {
  level: "school" | "college"
}

export function ApplicationDeadlines({ level }: ApplicationDeadlinesProps) {
  const isSchool = level === "school"
  const deadlines = isSchool ? schoolDeadlines : collegeDeadlines

  return (
    <div className="space-y-8 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-indigo-600">Application Deadlines</h2>
      <Table className=" bg-indigo-600">
        <TableCaption>Application deadlines for the upcoming academic year</TableCaption>
        <TableHeader>
          <TableRow className="bg-indigo-600 text-white">
            <TableHead className="w-[50%] text-white">Program</TableHead>
              <TableHead className="text-white">Deadline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deadlines.map((deadline, index) => (
            <TableRow key={deadline.program} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <TableCell className="font-medium text-indigo-600">{deadline.program}</TableCell>
                <TableCell>{(deadline as SchoolDeadline).deadline}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

