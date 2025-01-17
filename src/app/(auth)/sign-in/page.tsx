

import SignInForm from './sign-in-form'

export default function SignInPage() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 ">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>
      </div>
      <SignInForm />
    </div>
  )
}

