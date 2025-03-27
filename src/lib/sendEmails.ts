import { Resend } from "resend"
import VerificationEmail from "@/emails/VerificationEmail"
import WelcomeEmail from "@/emails/WelcomeEmail"
import ContactConfirmationEmail from "@/emails/ContactConfirmationEmail"
import AdminContactNotificationEmail from "@/emails/AdminContactNotificationEmail"

import StudentApplicationConfirmationEmail from "@/emails/StudentApplicationConfirmationEmail"
import StudentApplicationAdminNotificationEmail from "@/emails/StudentApplicationAdminNotificationEmail"
import TeacherApplicationConfirmationEmail from "@/emails/TeacherApplicationConfirmationEmail"
import TeacherApplicationAdminNotificationEmail from "@/emails/TeacherApplicationAdminNotificationEmail"
import type { ApiResponse } from "@/types/ApiResponse"
import TeacherProfileConfirmationEmail from "@/emails/TeacherProfileConfirmationEmail"
import TeacherProfileAdminNotificationEmail from "@/emails/TeacherProfileAdminNotificationEmail"
import StudentProfileConfirmationEmail from "@/emails/StudentProfileConfirmationEmail"
import StudentProfileAdminNotificationEmail from "@/emails/StudentProfileAdminNotificationEmail"
import PasswordResetRequestEmail from "@/emails/PasswordResetRequestEmail"
import PasswordResetSuccessEmail from "@/emails/PasswordResetSuccessEmail"

const resend = new Resend(process.env.RESEND_API_KEY)
const adminEmail = process.env.ADMIN_EMAIL || "abusalman.sylhet@gmail.com"

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
      from: "Classic School And College <contact@cscsylhet.com>",
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
      from: "CSC Contact <contact@cscsylhet.com>",
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

// Password reset request email
export async function sendPasswordResetEmail(email: string, name: string, resetUrl: string): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Account@cscsylhet.com",
      to: email,
      subject: "Reset Your Password - Classic School And College",
      react: PasswordResetRequestEmail({ name, resetUrl }),
    })

    return { success: true, message: "Password reset email sent successfully" }
  } catch (error) {
    console.error("Error sending password reset email: ", error)
    return { success: false, message: "Failed to send password reset email" }
  }
}

// Password reset success email
export async function sendPasswordResetSuccessEmail(email: string, name: string): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Account@cscsylhet.com",
      to: email,
      subject: "Password Reset Successful - Classic School And College",
      react: PasswordResetSuccessEmail({ name }),
    })

    return { success: true, message: "Password reset success email sent successfully" }
  } catch (error) {
    console.error("Error sending password reset success email: ", error)
    return { success: false, message: "Failed to send password reset success email" }
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
  subject: string,
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
        subject,
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

// Student profile confirmation email
export async function sendStudentProfileConfirmationEmail(email: string, name: string, profileId: string) {
  try {
    const data = await resend.emails.send({
      from: "Student Portal <portal@cscsylhet.com>",
      to: email,
      subject: "Student Profile Updated - Classic School And College",
      react: StudentProfileConfirmationEmail({
        name,
        email,
        profileId,
      }),
    })
    console.log("Student profile confirmation email sent:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending student profile confirmation email:", error)
    return { success: false, error }
  }
}

// Student profile admin notification email
export async function sendStudentProfileAdminNotificationEmail(
  studentName: string,
  studentEmail: string,
  programType: string,
  profileId: string,
  isNewProfile = false,
) {
  try {
    const data = await resend.emails.send({
      from: "Student Portal <portal@cscsylhet.com>",
      to: adminEmail,
      subject: isNewProfile ? `New Student Profile Created: ${studentName}` : `Student Profile Updated: ${studentName}`,
      react: StudentProfileAdminNotificationEmail({
        studentName,
        studentEmail,
        programType,
        profileId,
        isNewProfile,
      }),
    })
    console.log("Admin notification email sent:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending admin notification email:", error)
    return { success: false, error }
  }
}

// Teacher profile confirmation email
export async function sendTeacherProfileConfirmationEmail(email: string, name: string, profileId: string) {
  try {
    const data = await resend.emails.send({
      from: "Teacher Portal <portal@cscsylhet.com>",
      to: email,
      subject: "Teacher Profile Updated - Classic School And College",
      react: TeacherProfileConfirmationEmail({
        name,
        email,
        profileId,
      }),
    })
    console.log("Teacher profile confirmation email sent:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending teacher profile confirmation email:", error)
    return { success: false, error }
  }
}

// Teacher profile admin notification email
export async function sendTeacherProfileAdminNotificationEmail(
  teacherName: string,
  teacherEmail: string,
  subjectSpecialization: string,
  profileId: string,
  isNewProfile = false,
) {
  try {
    const data = await resend.emails.send({
      from: "Teacher Portal <portal@cscsylhet.com>",
      to: adminEmail,
      subject: isNewProfile ? `New Teacher Profile Created: ${teacherName}` : `Teacher Profile Updated: ${teacherName}`,
      react: TeacherProfileAdminNotificationEmail({
        teacherName,
        teacherEmail,
        subjectSpecialization,
        profileId,
        isNewProfile,
      }),
    })
    console.log("Admin notification email sent:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending admin notification email:", error)
    return { success: false, error }
  }
}

