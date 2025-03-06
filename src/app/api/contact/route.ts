import { NextResponse } from "next/server"
import { sendAdminNotificationEmail } from '@/lib/sendEmails'
import { sendConfirmationEmail } from '@/lib/sendEmails'



export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Send notification to admin
    sendAdminNotificationEmail(name, email, subject, message)

    // Send confirmation to user
    sendConfirmationEmail(email, name)

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred while sending the email." },
      { status: 500 },
    )
  }
}

