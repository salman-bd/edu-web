import { Resend } from "resend"
import VerificationEmail from "@/components/emails/VerificationEmail"
import WelcomeEmail from "@/components/emails/WelcomeEmail"
import ContactConfirmationEmail from "@/components/emails/ContactConfirmationEmail"
import AdminContactNotificationEmail from "@/components/emails/AdminContactNotificationEmail"

import ApplicationConfirmationEmail from "@/components/emails/ApplicationConfirmationEmail"
import ApplicationAdminNotificationEmail from "@/components/emails/ApplicationAdminNotificationEmail"
import TeacherApplicationConfirmationEmail from "@/components/emails/TeacherApplicationConfirmationEmail"
import TeacherApplicationAdminNotificationEmail from "@/components/emails/TeacherApplicationAdminNotificationEmail"
import { ApiResponse } from "@/types/ApiResponse"


const resend = new Resend(process.env.RESEND_API_KEY)
const adminEmail = process.env.ADMIN_EMAIL || "cscedubd@gmail.com"
const fromEmail = process.env.FROM_EMAIL || "cscedubd@gmail.com"


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





export async function sendApplicationConfirmationEmail(
  to: string,
  name: string,
  programType: string,
  applicationId: string,
) {
  try {
    console.log(`Sending application confirmation email to ${to}`)

    const { data, error } = await resend.emails.send({
      from: "Admissions <admissions@cscsylhet.com>",
      to,
      subject: "Your Application Has Been Received",
      react: ApplicationConfirmationEmail({
        name,
        programType,
        applicationId,
      }),
    })

    if (error) {
      console.error("Error sending application confirmation email:", error)
      throw new Error(`Failed to send confirmation email: ${error.message}`)
    }

    console.log("Application confirmation email sent successfully:", data)
    return data
  } catch (error) {
    console.error("Exception sending application confirmation email:", error)
    // Don't throw here to prevent API failure if email sending fails
    return null
  }
}

export async function sendApplicationAdminNotificationEmail(
  applicantName: string,
  applicantEmail: string,
  programType: string,
  applicationId: string,
) {
  try {
    console.log(`Sending admin notification email to ${adminEmail}`)

    const { data, error } = await resend.emails.send({
      from: "Admissions System <admissions@cscsylhet.com>",
      to: adminEmail,
      subject: `New Application: ${applicantName} for ${programType}`,
      react: ApplicationAdminNotificationEmail({
        applicantName,
        applicantEmail,
        programType,
        applicationId,
      }),
    })

    if (error) {
      console.error("Error sending admin notification email:", error)
      throw new Error(`Failed to send admin notification: ${error.message}`)
    }

    console.log("Admin notification email sent successfully:", data)
    return data
  } catch (error) {
    console.error("Exception sending admin notification email:", error)
    // Don't throw here to prevent API failure if email sending fails
    return null
  }
}

export async function sendTeacherApplicationConfirmationEmail(
  to: string,
  name: string,
  subject: string,
  applicationId: string,
) {
  try {
    console.log(`Sending teacher application confirmation email to ${to}`)

    const { data, error } = await resend.emails.send({
      from: "Careers <careers@cscsylhet.com>",
      to,
      subject: "Your Teaching Application Has Been Received",
      react: TeacherApplicationConfirmationEmail({
        name,
        subject,
        applicationId,
      }),
    })

    if (error) {
      console.error("Error sending teacher application confirmation email:", error)
      throw new Error(`Failed to send confirmation email: ${error.message}`)
    }

    console.log("Teacher application confirmation email sent successfully:", data)
    return data
  } catch (error) {
    console.error("Exception sending teacher application confirmation email:", error)
    // Don't throw here to prevent API failure if email sending fails
    return null
  }
}

export async function sendTeacherApplicationAdminNotificationEmail(
  applicantName: string,
  applicantEmail: string,
  subject: string,
  applicationId: string,
) {
  try {
    console.log(`Sending teacher admin notification email to ${adminEmail}`)

    const { data, error } = await resend.emails.send({
      from: "HR System <careers@cscsylhet.com>",
      to: adminEmail,
      subject: `New Teacher Application: ${applicantName} for ${subject}`,
      react: TeacherApplicationAdminNotificationEmail({
        applicantName,
        applicantEmail,
        subject,
        applicationId,
      }),
    })

    if (error) {
      console.error("Error sending teacher admin notification email:", error)
      throw new Error(`Failed to send admin notification: ${error.message}`)
    }

    console.log("Teacher admin notification email sent successfully:", data)
    return data
  } catch (error) {
    console.error("Exception sending teacher admin notification email:", error)
    // Don't throw here to prevent API failure if email sending fails
    return null
  }
}

