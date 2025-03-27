import { type NextRequest, NextResponse } from "next/server"
import { mongoDbConnect } from "@/lib/dbConnect"
import clientPromise from "@/lib/mongodb"
import crypto from "crypto"
import { sendPasswordResetEmail } from "@/lib/sendEmails"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    await mongoDbConnect()
    const client = await clientPromise
    const db = client.db("education_app")
    const usersCollection = db.collection("users")
    const resetTokensCollection = db.collection("password_reset_tokens")

    // Find the user
    const user = await usersCollection.findOne({ email })

    if (!user) {
      // For security reasons, don't reveal that the user doesn't exist
      return NextResponse.json(
        { message: "If your email is registered, you will receive a password reset link" },
        { status: 200 },
      )
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    // Set token expiration (1 hour from now)
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1)

    // Delete any existing tokens for this user
    await resetTokensCollection.deleteMany({ userId: user._id })

    // Save the new token
    await resetTokensCollection.insertOne({
      userId: user._id,
      token: hashedToken,
      expiresAt,
      createdAt: new Date(),
    })

    // Send the reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`
    await sendPasswordResetEmail(user.email, user.name, resetUrl)

    return NextResponse.json({ message: "Password reset email sent" }, { status: 200 })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ message: "An error occurred while processing your request" }, { status: 500 })
  }
}

