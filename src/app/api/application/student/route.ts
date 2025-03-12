import { NextRequest, NextResponse } from "next/server";  
import clientPromise from "@/lib/mongodb";  
import { studentApplicationSchema } from "@/schemas/applicationsSchema";  
import { ObjectId } from "mongodb";
import { sendStudentApplicationAdminNotificationEmail, sendStudentApplicationConfirmationEmail } from "@/lib/sendEmails";

export async function POST(request: NextRequest) {  
  try {  
    const body = await request.json();  
    const validatedData = studentApplicationSchema.parse(body);  
    console.log('Validated Data: ', validatedData);  

    // Connect to MongoDB  
    const client = await clientPromise;  
    const db = client.db("education_app");  
    const collection = db.collection('student_applications');  

    // In a real application, you would check authentication here  
    // if (!isAuthenticated(request)) {  
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });  
    // }  

    const newApplication = await collection.insertOne(validatedData);  
    const applicationId = newApplication.insertedId.toString();  

    // Log the new application details for debugging  
    console.log('New Application ID: ', applicationId);  

    // Send confirmation email
    const fullName = `${validatedData.firstName} ${validatedData.lastName}`
    await sendStudentApplicationConfirmationEmail(
      validatedData.email,
      fullName,
      validatedData.programType,
      applicationId
    )

    // Send notification to admin
    await sendStudentApplicationAdminNotificationEmail(
      fullName,
      validatedData.email,
      validatedData.programType,
      applicationId
    )

    // Return a response including the new application ID  
    return NextResponse.json({  
      success: true,  
      message: 'Application created successfully!',  
      application: {  
        id: applicationId, // Return the new document's ID as a string  
        ...validatedData // Optionally include the original validated data  
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
import { NextResponse } from "next/server"
import {mongoDbConnect} from "@/lib/dbConnect";
import StudentApplication from "@/models/StudentApplication";
import { z } from "zod"
import { sendStudentApplicationAdminNotificationEmail, sendStudentApplicationConfirmationEmail } from "@/lib/sendEmails"


const applicationSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  dateOfBirth: z.string().min(1),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(4),
  programLevel: z.enum(["elementary", "middle", "high", "college"]),
  programType: z.string().min(1),
  previousSchool: z.string().min(2),
  personalStatement: z.string().min(50),
})

export async function POST(request: Request) {
  try {
    await mongoDbConnect();
    
    const body = await request.json()
    console.log("Received application data:", {
      ...body,
      personalStatement: body.personalStatement ? `${body.personalStatement.substring(0, 20)}...` : undefined,
    })

    // Validate the request body
    const validatedData = applicationSchema.parse(body)
    console.log('Validated Data: ', validatedData);
    

    // Create a new application document
    const applicationData = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      dateOfBirth: new Date(validatedData.dateOfBirth),
      address: validatedData.address,
      city: validatedData.city,
      state: validatedData.state,
      zipCode: validatedData.zipCode,
      programLevel: validatedData.programLevel,
      programType: validatedData.programType,
      previousSchool: validatedData.previousSchool,
      personalStatement: validatedData.personalStatement,
      status: "PENDING",
      submittedAt: new Date(),
      updatedAt: new Date(),
    }

    console.log("Inserting application into MongoDB: ", applicationData)

    const email = applicationData.email

    let application
    const existingApplication = await StudentApplication.findOne({ email: email });  
    console.log('Existing Application: ', existingApplication);
    if (!existingApplication) {  
      const newApplication = new StudentApplication(applicationData); 
      application = await newApplication.save()
    } else {
      application = await existingApplication.save()
      return Response.json({success: true, message: "Application updated successfully", application: application}, { status: 200 })
    }

    console.log("Application inserted data in MongoDB:", application)

    // Send confirmation email
    const fullName = `${validatedData.firstName} ${validatedData.lastName}`
    await sendStudentApplicationConfirmationEmail(
      validatedData.email,
      fullName,
      validatedData.programType,
      application._id.toString(),
    )

    // Send notification to admin
    await sendStudentApplicationAdminNotificationEmail(
      fullName,
      validatedData.email,
      validatedData.programType,
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

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 },
      )
    }

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



