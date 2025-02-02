
import { Suspense } from 'react';
import { StudentCodeVerificationForm } from '@/components/profile/StudentCodeVerificationForm'
import VerificaCodeSkeleton from "@/components/profile/skeletons/verificationCode";

export default function StudentVerificationPage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Verify Your Student Status</h1>
      <Suspense fallback={<VerificaCodeSkeleton />}>
        <StudentCodeVerificationForm />
      </Suspense>
    </div>
  )
}

