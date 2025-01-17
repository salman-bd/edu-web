

import { Suspense } from 'react';
import { TeacherCodeVerificationForm } from './TeacherCodeVerificationForm'
import VerificaCodeSkeleton from "@/components/profile/skeletons/verificationCode";

export default function TeacherVerificationPage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Verify Your Teacher Status</h1>
      <Suspense fallback={<VerificaCodeSkeleton />}>
      <TeacherCodeVerificationForm />
      </Suspense>
      
    </div>
  )
}

