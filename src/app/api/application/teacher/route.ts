import { NextRequest, NextResponse } from "next/server";  
import clientPromise from "@/lib/mongodb";  
import { studentApplicationSchema } from "@/schemas/applicationsSchema";  
import { ObjectId } from "mongodb";
import { sendTeacherApplicationAdminNotificationEmail, sendTeacherApplicationConfirmationEmail } from "@/lib/sendEmails";

export async function POST(request: NextRequest) {  
  try {  
    const formData = await request.formData()

    // Extract file
    const resumeFile = formData.get("resume") as File

    if (!resumeFile) {
      return NextResponse.json({ success: false, message: "Resume file is required" }, { status: 400 })}

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!validTypes.includes(resumeFile.type)) {
      return NextResponse.json({ success: false, message: "Invalid file type. Only PDF and Word documents are accepted." }, { status: 400 })}

    // Validate file size (5MB max)
    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: "File size exceeds 5MB limit" }, { status: 400 })}


    // Instead of saving to filesystem, store file as Buffer in MongoDB
    const fileBuffer = Buffer.from(await resumeFile.arrayBuffer())

    // Extract other form fields
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const address = formData.get("address") as string
    const highestDegree = formData.get("highestDegree") as string
    const university = formData.get("university") as string
    const yearsOfExperience = formData.get("yearsOfExperience") as string
    const subjectSpecialization = formData.get("subjectSpecialization") as string
    const teachingLevelJson = formData.get("teachingLevel") as string
    const teachingLevel = JSON.parse(teachingLevelJson)
    const coverLetter = formData.get("coverLetter") as string


    // Create application document
    const applicationData = {
      firstName,
      lastName,
      email,
      phone,
      address,
      highestDegree,
      university,
      yearsOfExperience,
      subjectSpecialization,
      teachingLevel,
      coverLetter,
      resume: {
        filename: resumeFile.name,
        contentType: resumeFile.type,
        size: resumeFile.size,
        data: fileBuffer,
      },
      status: "PENDING",
      submittedAt: new Date(),
      updatedAt: new Date(),
    }

    // Connect to MongoDB  
    const client = await clientPromise;  
    const db = client.db("education_app");  
    const collection = db.collection('teacher_applications');  

    // In a real application, you would check authentication here  
    // if (!isAuthenticated(request)) {  
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });  
    // }  

    const newApplication = await collection.insertOne(applicationData);  
    const applicationId = newApplication.insertedId.toString();  

    // Log the new application details for debugging  
    console.log('New Application ID: ', applicationId); 
    
       // Send confirmation email
       const fullName = `${firstName} ${lastName}`
       await sendTeacherApplicationConfirmationEmail(
        email, 
        fullName, 
        subjectSpecialization, 
        applicationId
      )
   
      // Send admin notification
      await sendTeacherApplicationAdminNotificationEmail(
        fullName,
        email,
        subjectSpecialization,
        applicationId
      )

    // Return a response including the new application ID  
    return NextResponse.json({  
      success: true,  
      message: 'Application created successfully!',  
      application: {  
        id: applicationId, // Return the new document's ID as a string  
        ...applicationData // Optionally include the original validated data  
      },  
    }, { status: 201 });  

  } catch (error) {  
    console.error("Error fetching applications:", error);  
    return NextResponse.json({  
      success: false,  
      error: "Failed to create application",  
      details: error instanceof Error ? error.message : "Unknown error",  
    }, { status: 500 });  
  }  
}  


export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id'); 
    const status = request.nextUrl.searchParams.get('status')
    const body = await request.json();  
    const validatedData = studentApplicationSchema.parse(body);  
    console.log('Validated Data: ', validatedData);  

    // Connect to MongoDB  
    const client = await clientPromise;  
    const db = client.db("education_app");  
    const collection = db.collection('student_applications');  

    // In a real application, you would check authentication here
    // if (!isAuthenticated(request)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }


    if (!id) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const validStatuses = ["PENDING", "UNDER_REVIEW", "INTERVIEW_SCHEDULED", "ACCEPTED", "REJECTED", "WAITLISTED"]
    if (status === null || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Update the application status
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...validatedData,
          status,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Fetch the updated application
    const updatedApplication = await collection.findOne({ _id: new ObjectId(id) })

    return NextResponse.json({
      success: true,
      application: updatedApplication,
    })
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 })
  }
}




/*
import { NextRequest, NextResponse } from "next/server"
import {mongoDbConnect} from "@/lib/dbConnect";
import TeacherApplication from "@/models/TeacherApplication";
import { sendTeacherApplicationConfirmationEmail, sendTeacherApplicationAdminNotificationEmail } from "@/lib/sendEmails"


export async function POST(request: NextRequest) {
  try {
    // Parse the multipart form data
    const formData = await request.formData()

    // Extract file
    const resumeFile = formData.get("resume") as File

    if (!resumeFile) {
      return NextResponse.json({ success: false, message: "Resume file is required" }, { status: 400 })}

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!validTypes.includes(resumeFile.type)) {
      return NextResponse.json({ success: false, message: "Invalid file type. Only PDF and Word documents are accepted." }, { status: 400 })}

    // Validate file size (5MB max)
    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: "File size exceeds 5MB limit" }, { status: 400 })}

    await mongoDbConnect()

    // Instead of saving to filesystem, store file as Buffer in MongoDB
    const fileBuffer = Buffer.from(await resumeFile.arrayBuffer())

    // Extract other form fields
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const address = formData.get("address") as string
    const highestDegree = formData.get("highestDegree") as string
    const university = formData.get("university") as string
    const yearsOfExperience = formData.get("yearsOfExperience") as string
    const subjectSpecialization = formData.get("subjectSpecialization") as string
    const teachingLevelJson = formData.get("teachingLevel") as string
    const teachingLevel = JSON.parse(teachingLevelJson)
    const coverLetter = formData.get("coverLetter") as string


    // Create application document
    const applicationData = {
      firstName,
      lastName,
      email,
      phone,
      address,
      highestDegree,
      university,
      yearsOfExperience,
      subjectSpecialization,
      teachingLevel,
      coverLetter,
      resume: {
        filename: resumeFile.name,
        contentType: resumeFile.type,
        size: resumeFile.size,
        data: fileBuffer,
      },
      status: "PENDING",
      submittedAt: new Date(),
      updatedAt: new Date(),
    }

    console.log("Teacher application data to be inserted: ", {
      ...applicationData,
      resume: {
        filename: applicationData.resume.filename,
        contentType: applicationData.resume.contentType,
        size: applicationData.resume.size,
        data: "Buffer data (not shown)",
      },
    })

    // Insert into MongoDB
    let application
    const existingApplication = await TeacherApplication.findOne({ email: email });  
    if (!existingApplication) {  
      const newApplication = new TeacherApplication(applicationData); 
      application = await newApplication.save()
    } else {
      application = await existingApplication.save()
      return Response.json({success: true, message: "Application updated successfully", application: application}, { status: 200 })
    }

    // console.log("Application inserted data in MongoDB:", application)

    // Send confirmation email
    const fullName = `${firstName} ${lastName}`
    await sendTeacherApplicationConfirmationEmail(email, fullName, subjectSpecialization, application._id.toString())

    // Send admin notification
    await sendTeacherApplicationAdminNotificationEmail(
      fullName,
      email,
      subjectSpecialization,
      application._id.toString(),
    )

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        applicationId: application._id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error submitting application:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
*/