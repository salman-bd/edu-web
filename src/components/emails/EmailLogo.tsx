import { Img } from "@react-email/components"

export function EmailLogo() {
  // Use absolute URL for email images
  const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`

  return <Img src={logoUrl} width="120" height="50" alt="School Logo" className="mx-auto mb-4" />
}

