import { type NextRequest, NextResponse } from "next/server"
import { mongoDbConnect } from "@/lib/dbConnect"
import clientPromise from "@/lib/mongodb"
import crypto from "crypto"
import { hash } from "bcryptjs"
import { ObjectId } from "mongodb"
import { sendPasswordResetSuccessEmail } from "@/lib/sendEmails"

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json({ message: "Token and password are required" }, { status: 400 })
    }

    await mongoDbConnect()
    const client = await clientPromise
    const db = client.db("education_app")
    const usersCollection = db.collection("users")
    const resetTokensCollection = db.collection("password_reset_tokens")

    // Hash the token from the URL to compare with the stored hashed token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

    // Find the token in the database
    const tokenDoc = await resetTokensCollection.findOne({
      token: hashedToken,
      expiresAt: { $gt: new Date() }, // Token must not be expired
    })

    if (!tokenDoc) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 })
    }

    // Find the user
    const user = await usersCollection.findOne({ _id: new ObjectId(tokenDoc.userId) })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Hash the new password
    const hashedPassword = await hash(password, 12)

    // Update the user's password
    await usersCollection.updateOne({ _id: new ObjectId(tokenDoc.userId) }, { $set: { password: hashedPassword } })

    // Delete the used token
    await resetTokensCollection.deleteOne({ _id: tokenDoc._id })

    // Send success email
    await sendPasswordResetSuccessEmail(user.email, user.name)

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ message: "An error occurred while resetting your password" }, { status: 500 })
  }
}

