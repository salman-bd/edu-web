import { type NextRequest, NextResponse } from "next/server"
import { serverStudentProfileSchema } from "@/schemas/studentProfileSchema"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    // Parse the multipart form data
    const formData = await request.formData()

    // Extract file data
    const photoFile = formData.get("photo") as File | null

    // Check for affiliated status
    const isAffiliated = formData.get("isAffiliated") === "true"

    // Create data object for validation
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      dateOfBirth: formData.get("dateOfBirth"),
      gender: formData.get("gender"),
      institutionName: formData.get("institutionName"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
      programLevel: formData.get("programLevel"),
      programType: formData.get("programType"),
      previousSchool: formData.get("previousSchool") || "",
      personalStatement: formData.get("personalStatement") || "",
      photo: photoFile,
    }

    // Validate the data
    const validatedData = serverStudentProfileSchema.parse(data)

    // Handle photo upload
    let photoPath = null

    if (photoFile) {
      const photoBuffer = await photoFile.arrayBuffer()
      const photoFileName = `${uuidv4()}-${photoFile.name}`
      photoPath = `/uploads/photos/${photoFileName}`

      // In a real application, you would save this to a storage service
      console.log(`Photo would be saved to: ${photoPath}`)

      // If running on a server with file system access:
      // await writeFile(join(process.cwd(), 'public', photoPath), Buffer.from(photoBuffer))
    }

    // Generate a profile ID
    const profileId = uuidv4()

    // Create the student profile object to save to database
    const studentProfile = {
      id: profileId,
      ...validatedData,
      photoPath,
      fullName: `${validatedData.firstName} ${validatedData.lastName}`,
      isAffiliated,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // In a real application, you would save this to a database
    console.log("Student profile to save:", studentProfile)

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Student profile created successfully",
      data: {
        id: profileId,
        ...studentProfile,
        // Don't return the actual file data in the response
        photo: photoPath ? { name: photoFile?.name, path: photoPath } : null,
      },
    })
  } catch (error) {
    console.error("Error processing student profile:", error)

    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: `Error: ${error.message}` }, { status: 400 })
    }

    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 })
  }
}

