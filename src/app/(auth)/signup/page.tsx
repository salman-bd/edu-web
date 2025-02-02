import SignUpForm  from '@/components/auth/SignUpForm'
import { GraduationCap } from 'lucide-react'

export default function SignUpPage() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <header className="text-center px-4">
          <div className="mx-auto h-12 w-12 text-primary">
            <GraduationCap className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-indigo-600">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Join our learning community and start your educational journey today
          </p>
        </header>
        <SignUpForm />
      </div>
    </div>
  )
}

