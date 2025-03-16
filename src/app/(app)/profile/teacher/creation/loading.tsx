import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto py-12 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-indigo-600">Loading profile form...</h3>
        <p className="text-muted-foreground">Please wait while we prepare your profile form</p>
      </div>
    </div>
  )
}

