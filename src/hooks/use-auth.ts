"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useAuth({ required = false } = {}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const isLoading = status === "loading"
  const isAuthenticated = !!session?.user

  useEffect(() => {
    if (required && !isLoading && !isAuthenticated) {
      router.push("/signin")
    }
  }, [required, isLoading, isAuthenticated, router])

  return {
    session,
    isLoading,
    isAuthenticated,
  }
}

