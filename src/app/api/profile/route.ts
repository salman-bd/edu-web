import { v2 as cloudinary } from "cloudinary"
import { mongoDbConnect } from "@/lib/dbConnect"
import ProfileModel from "@/models/ProfileModel"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  await mongoDbConnect()

  try {
    const formData = await request.formData()

    // Log all form data
    console.log("Received form data:", Object.fromEntries(formData))

    // Parse form data with explicit types
    const avatar = formData.get("avatar") as File | string
    const name = formData.get("name") as string
    const institutionName = formData.get("institutionName") as string
    const designation = formData.get("designation") as string
    const grade = formData.get("grade") as string
    console.log("Received grade:", grade)
    const email = formData.get("email") as string
    const contactNo = formData.get("contactNo") as string
    const school = formData.get("school") as string
    const sscPassingYear = formData.get("sscPassingYear") as string
    const college = formData.get("college") as string
    const hscPassingYear = formData.get("hscPassingYear") as string
    const university = formData.get("university") as string
    const graduationYear = formData.get("graduationYear") as string
    const gender = formData.get("gender") as string
    const birthDateString = formData.get("birthDate") as string
    const career = formData.get("career") as string

    const isAffiliated = formData.get("isAffiliated") === "true"
    const profileType = formData.get("profileType") as string

    // Handle avatar upload
    let photoUrl
    if (avatar instanceof File) {
      const arrayBuffer = await avatar.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const cloudinaryResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "auto" }, (error, result) => {
            if (error) reject(error)
            else resolve(result)
          })
          .end(buffer)
      })

      photoUrl = (cloudinaryResponse as { secure_url: string }).secure_url
    } else {
      photoUrl = avatar
    }

    // Define updates with fallback to undefined for optional fields
    const data = {
      avatar: photoUrl,
      name,
      institutionName,
      designation: designation || undefined,
      grade: grade || undefined,
      email,
      contactNo,
      school: school || undefined,
      sscPassingYear: sscPassingYear || undefined,
      college: college || undefined,
      hscPassingYear: hscPassingYear || undefined,
      university: university || undefined,
      graduationYear: graduationYear || undefined,
      gender,
      birthDate: new Date(birthDateString), // Ensure date is stored as Date
      career: career || undefined,
      profileType,
      isAffiliated,
    }

    console.log("Data to be saved:", data)

    // Find existing profile or create new one
    const existingProfile = await ProfileModel.findOne({ email: data.email })
    if (existingProfile) {
      Object.assign(existingProfile, data)
      await existingProfile.save()
      return Response.json(
        {
          success: true,
          message: "Profile updated successfully",
          profile: existingProfile,
        },
        { status: 200 },
      )
    } else {
      const newProfile = new ProfileModel(data)
      await newProfile.save()
      console.log("Created new profile: ", newProfile)
      return Response.json(
        {
          success: true,
          message: "Profile created successfully",
          profile: newProfile,
        },
        { status: 201 },
      )
    }
  } catch (error) {
    console.error("Error updating profile: ", error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return Response.json(
      {
        success: false,
        message: `Error updating profile: ${errorMessage}`, // More descriptive error message
      },
      { status: 500 },
    )
  }
}

