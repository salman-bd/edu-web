import { Resend } from "resend"
import VerificationEmail from "@/components/emails/VerificationEmail"
import WelcomeEmail from "@/components/emails/WelcomeEmail"
import ContactConfirmationEmail from "@/components/emails/ContactConfirmationEmail"
import AdminContactNotificationEmail from "@/components/emails/AdminContactNotificationEmail"

import StudentApplicationConfirmationEmail from "@/components/emails/StudentApplicationConfirmationEmail"
import StudentApplicationAdminNotificationEmail from "@/components/emails/StudentApplicationAdminNotificationEmail"
import TeacherApplicationConfirmationEmail from "@/components/emails/TeacherApplicationConfirmationEmail"
import TeacherApplicationAdminNotificationEmail from "@/components/emails/TeacherApplicationAdminNotificationEmail"
import { ApiResponse } from "@/types/ApiResponse"


const resend = new Resend(process.env.RESEND_API_KEY)
const adminEmail = process.env.ADMIN_EMAIL || "cscedubd@gmail.com"


export async function sendVerificationEmail(email: string, name: string, verifyCode: string): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Verification@cscsylhet.com",
      to: email,
      subject: "CSC Website | Verification Code",
      react: VerificationEmail({ name, otp: verifyCode }),
    })

    return { success: true, message: "Verification email sent successfully" }
  } catch (error) {
    console.error("Error sending verification email: ", error)
    return { success: false, message: "Failed to send verification email" }
  }
}

export async function sendWelcomeEmail(email: string, name: string): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "SignIn@cscsylhet.com",
      to: email,
      subject: "Signed In Successfully",
      react: WelcomeEmail({ name }),
    })
    return { success: true, message: "Welcome email sent successfully" }

  } catch (error) {
    console.error("Error sending welcome email: ", error)
    return { success: false, message: "Failed to send welcome email" }
  }
}

export async function sendContactConfirmationEmail(email: string, name: string): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'Classic School And College <contact@cscsylhet.com>',
      to: [email],
      subject: "We received your message",
      react: ContactConfirmationEmail({ name }),
    })
    return { success: true, message: "Contact confirmation email sent successfully" }

  } catch (error) {
    console.error("Error sending contact confirmaiton email: ", error)
    return { success: false, message: "Failed to send contact confirmaiton email" }
  }
}


export async function sendAdminContactNotificationEmail(
  email: string,
  name: string,
  subject: string,
  message: string,
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'CSC Contact <contact@cscsylhet.com>',
      to: adminEmail,
      subject: `New contact form submission: ${subject}`,
      react: AdminContactNotificationEmail({ name, email, subject, message }),
    })

    return { success: true, message: "Contact notification email sent successfully" }

  } catch (error) {
    console.error("Error sending contact nofification email: ", error)
    return { success: false, message: "Failed to send contact notification email" }
  }
}





// Student application confirmation email
export async function sendStudentApplicationConfirmationEmail(
  email: string,
  name: string,
  programType: string,
  applicationId: string,
) {
  try {
    const data = await resend.emails.send({
      from: "Admissions <admissions@cscsylhet.com>",
      to: email,
      subject: "Application Received - Classic School And College",
      react: StudentApplicationConfirmationEmail({
        name,
        programType,
        applicationId,
      }),
    })
    console.log("Student confirmation email sent:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending student confirmation email:", error)
    return { success: false, error }
  }
}

// Student application admin notification email
export async function sendStudentApplicationAdminNotificationEmail(
  applicantName: string,
  applicantEmail: string,
  programType: string,
  applicationId: string,
) {
  try {
    const data = await resend.emails.send({
      from: "Admissions System <admissions@cscsylhet.com>",
      to: adminEmail,
      subject: `New Student Application: ${applicantName}`,
      react: StudentApplicationAdminNotificationEmail({
        applicantName,
        applicantEmail,
        programType,
        applicationId,
      }),
    })
    console.log("Admin notification email sent:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending admin notification email:", error)
    return { success: false, error }
  }
}

// Teacher application confirmation email
export async function sendTeacherApplicationConfirmationEmail(
  email: string,
  name: string,
  subject: string,
  applicationId: string,
) {
  try {
    const data = await resend.emails.send({
      from: "Careers <careers@cscsylhet.com>",
      to: email,
      subject: "Teaching Application Received - Classic School And College",
      react: TeacherApplicationConfirmationEmail({
        name,
        subject,
        applicationId,
      }),
    })
    console.log("Teacher confirmation email sent:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending teacher confirmation email:", error)
    return { success: false, error }
  }
}

// Teacher application admin notification email
export async function sendTeacherApplicationAdminNotificationEmail(
  applicantName: string,
  applicantEmail: string,
  subject: string,
  applicationId: string,
) {
  try {
    const data = await resend.emails.send({
      from: "HR System <careers@cscsylhet.com>",
      to: adminEmail,
      subject: `New Teacher Application: ${applicantName}`,
      react: TeacherApplicationAdminNotificationEmail({
        applicantName,
        applicantEmail,
        subject,
        applicationId,
      }),
    })
    console.log("HR notification email sent:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending HR notification email:", error)
    return { success: false, error }
  }
}

