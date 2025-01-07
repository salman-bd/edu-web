'use client'

import { Button } from '@/components/ui/button'
import { checkoutAction } from '@/lib/actions'
import { useActionState } from 'react'

export function EnrollButton({ priceId }: { priceId: string }) {
  const [, formAction, isPending] = useActionState(checkoutAction, null)
  return (
    <form action={formAction}>
      <input type="hidden" name="priceId" value={priceId} />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Processing...' : 'Enroll Now'}
      </Button>
    </form>
  )
}

