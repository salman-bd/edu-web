import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { School, GraduationCap, Calendar } from 'lucide-react'
import type { EducationalInfoData } from './data'

interface EducationalInfoProps {
  getEducationalInfo: () => Promise<EducationalInfoData | null>
}

export default function EducationalInfo({ getEducationalInfo }: EducationalInfoProps) {
  const data = use(getEducationalInfo())

  if (!data) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">No educational information available</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Educational Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <InfoItem icon={<School className="text-blue-500" />} label="Current Institution" value={data.institutionName} />
        <InfoItem icon={<GraduationCap className="text-green-500" />} label="Current Grade/Class" value={data.grade} />
        <InfoItem icon={<School className="text-purple-500" />} label="School" value={data.school} />
        <InfoItem icon={<Calendar className="text-red-500" />} label="SSC Passing Year" value={data.sscPassingYear} />
        <InfoItem icon={<School className="text-yellow-500" />} label="College" value={data.college} />
        <InfoItem icon={<Calendar className="text-pink-500" />} label="HSC Passing Year" value={data.hscPassingYear} />
        <InfoItem icon={<School className="text-indigo-500" />} label="University" value={data.university} />
        <InfoItem icon={<Calendar className="text-orange-500" />} label="Graduation Year" value={data.graduationYear} />
      </CardContent>
    </Card>
  )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-gray-500">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

function use<T>(promise: Promise<T>): T {
  if (promise.status === 'fulfilled') {
    return promise.value;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else if (promise.status === 'pending') {
    throw promise;
  } else {
    promise.status = 'pending';
    promise.then(
      result => {
        promise.status = 'fulfilled';
        promise.value = result;
      },
      reason => {
        promise.status = 'rejected';
        promise.reason = reason;
      },
    );
    throw promise;
  }
}

