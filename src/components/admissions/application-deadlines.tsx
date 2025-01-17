import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface SchoolDeadline {
  program: string
  deadline: string
}

interface CollegeDeadline {
  program: string
  fall: string
  spring: string
}

const schoolDeadlines: SchoolDeadline[] = [
  { program: 'Elementary School (K-5)', deadline: 'March 1' },
  { program: 'Middle School (6-8)', deadline: 'February 15' },
  { program: 'High School (9-12)', deadline: 'January 31' },
  { program: 'International Baccalaureate', deadline: 'December 15' },
]

const collegeDeadlines: CollegeDeadline[] = [
  { program: 'Undergraduate Programs', fall: 'May 1', spring: 'November 1' },
  { program: 'Graduate Programs', fall: 'February 1', spring: 'September 1' },
  { program: 'Transfer Students', fall: 'June 1', spring: 'November 15' },
  { program: 'International Students', fall: 'March 1', spring: 'October 1' },
]

interface ApplicationDeadlinesProps {
  level: 'school' | 'college'
}

export function ApplicationDeadlines({ level }: ApplicationDeadlinesProps) {
  const isSchool = level === 'school'
  const deadlines = isSchool ? schoolDeadlines : collegeDeadlines

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Application Deadlines</h2>
      <Table>
        <TableCaption>Application deadlines for the upcoming academic year</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Program</TableHead>
            {isSchool ? (
              <TableHead>Deadline</TableHead>
            ) : (
              <>
                <TableHead>Fall Semester</TableHead>
                <TableHead>Spring Semester</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {deadlines.map((deadline) => (
            <TableRow key={deadline.program}>
              <TableCell className="font-medium">{deadline.program}</TableCell>
              {isSchool ? (
                <TableCell>{(deadline as SchoolDeadline).deadline}</TableCell>
              ) : (
                <>
                  <TableCell>{(deadline as CollegeDeadline).fall}</TableCell>
                  <TableCell>{(deadline as CollegeDeadline).spring}</TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

