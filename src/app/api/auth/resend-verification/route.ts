import { type NextRequest, NextResponse } from "next/server"
import { sendVerificationEmail } from "@/lib/sendEmails"
import clientPromise from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 },
      )
    }

    const decodedEmail = decodeURIComponent(email)

    const client = await clientPromise
    const db = client.db("education_app")
    const collection = db.collection("users")
    const user = await collection.findOne({ email: decodedEmail })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      )
    }

    // Check if the user is already verified
    if (user.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Account is already verified",
        },
        { status: 400 },
      )
    }

    // Generate a new verification code
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
    const verifyCodeExpiry = new Date(Date.now() + 3600000) // 1 hour

    // Update the user with the new verification code
    await collection.updateOne(
      { email: decodedEmail },
      {
        $set: {
          verifyCode,
          verifyCodeExpiry,
        },
      },
    )

    // Send the new verification code
    const emailResponse = await sendVerificationEmail(decodedEmail, user.name, verifyCode)

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Verification code resent successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error resending verification code:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error resending verification code",
      },
      { status: 500 },
    )
  }
}

