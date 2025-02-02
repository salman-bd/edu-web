

import SignInForm from '@/components/auth/SignInForm'

export default function SignInPage() {
  return (
    <div className='container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8'>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2 px-4">
          <h1 className="text-3xl font-bold text-indigo-600">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>
        <SignInForm />
      </div>

    </div>
  )
}

