import { Resend } from "resend"
import type { ApiResponse } from "@/types/ApiResponse"
import WelcomeEmail from "emails/WelcomeEmail"
import VerificationEmail from "emails/VerificationEmail"
import AdminNotificationEmail from "emails/AdminNotificationEmail"
import ConfirmationEmail from "emails/ConfirmationEmail"
import ApplicationConfirmationEmail from "emails/ApplicationConfirmationEmail"
import ApplicationAdminNotificationEmail from "emails/ApplicationAdminNotificationEmail"
import TeacherApplicationConfirmationEmail from "emails/TeacherApplicationConfirmationEmail"
import TeacherApplicationAdminNotificationEmail from "emails/TeacherApplicationAdminNotificationEmail"

const resend = new Resend(process.env.RESEND_API_KEY)

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
      subject: "Classic School And College",
      react: WelcomeEmail({ name }),
    })

    return { success: true, message: "Welcome email sent successfully" }
  } catch (error) {
    console.error("Error sending welcome email: ", error)
    return { success: false, message: "Failed to send welcome email" }
  }
}

export async function sendAdminNotificationEmail(
  email: string,
  name: string,
  subject: string,
  message: string,
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "CSC Contact <contact@cscsylhet.com>",
      to: [process.env.ADMIN_EMAIL as string],
      subject: `New contact form submission: ${subject}`,
      react: AdminNotificationEmail({ name, email, subject, message }),
    })

    return { success: true, message: "Welcome email sent successfully" }
  } catch (error) {
    console.error("Error sending welcome email: ", error)
    return { success: false, message: "Failed to send welcome email" }
  }
}

export async function sendConfirmationEmail(email: string, name: string): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Classic School And College <contact@cscsylhet.com>",
      to: [email],
      subject: "We received your message",
      react: ConfirmationEmail({ name }),
    })

    return { success: true, message: "Welcome email sent successfully" }
  } catch (error) {
    console.error("Error sending welcome email: ", error)
    return { success: false, message: "Failed to send welcome email" }
  }
}

export async function sendApplicationConfirmationEmail(
  email: string,
  name: string,
  programType: string,
  applicationId: string,
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Admissions <admissions@cscsylhet.com>",
      to: [email],
      subject: "Your Application Has Been Received",
      react: ApplicationConfirmationEmail({ name, programType, applicationId }),
    })

    return { success: true, message: "Application confirmation email sent successfully" }
  } catch (error) {
    console.error("Error sending application confirmation email: ", error)
    return { success: false, message: "Failed to send application confirmation email" }
  }
}

export async function sendApplicationAdminNotificationEmail(
  applicantName: string,
  applicantEmail: string,
  programType: string,
  applicationId: string,
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Admissions System <admissions@cscsylhet.com>",
      to: [process.env.ADMIN_EMAIL as string],
      subject: `New Application: ${applicantName} - ${programType}`,
      react: ApplicationAdminNotificationEmail({
        applicantName,
        applicantEmail,
        programType,
        applicationId,
      }),
    })

    return { success: true, message: "Admin notification email sent successfully" }
  } catch (error) {
    console.error("Error sending admin notification email: ", error)
    return { success: false, message: "Failed to send admin notification email" }
  }
}

export async function sendTeacherApplicationConfirmationEmail(
  email: string,
  name: string,
  subject: string,
  applicationId: string,
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Careers <careers@cscsylhet.com>",
      to: [email],
      subject: "Your Teaching Application Has Been Received",
      react: TeacherApplicationConfirmationEmail({ name, subject, applicationId }),
    })

    return { success: true, message: "Teacher application confirmation email sent successfully" }
  } catch (error) {
    console.error("Error sending teacher application confirmation email: ", error)
    return { success: false, message: "Failed to send teacher application confirmation email" }
  }
}

export async function sendTeacherApplicationAdminNotificationEmail(
  applicantName: string,
  applicantEmail: string,
  subject: string,
  applicationId: string,
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "HR System <careers@cscsylhet.com>",
      to: [process.env.ADMIN_EMAIL as string],
      subject: `New Teacher Application: ${applicantName} - ${subject}`,
      react: TeacherApplicationAdminNotificationEmail({
        applicantName,
        applicantEmail,
        subject,
        applicationId,
      }),
    })

    return { success: true, message: "Admin notification email sent successfully" }
  } catch (error) {
    console.error("Error sending admin notification email: ", error)
    return { success: false, message: "Failed to send admin notification email" }
  }
}

