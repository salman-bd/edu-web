import { Resend } from "resend"
import { ApiResponse } from "@/types/ApiResponse";
import WelcomeEmail from "emails/WelcomeEmail";
import VerificationEmail from "emails/VerificationEmail";
import AdminNotificationEmail from "emails/AdminNotificationEmail";
import ConfirmationEmail from "emails/ConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(
    email: string,
    name: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Verification@cscsylhet.com',
            to: email,
            subject: 'CSC Website | Verification Code',
            react: VerificationEmail({name, otp: verifyCode}),
          });

        return {success: true, message: 'Verification email sent successfully'}
    } catch (error) {
        console.error("Error sending verification email: ", error);
        return {success: false, message: 'Failed to send verification email'}
    }
}

export async function sendWelcomeEmail(
    email: string,
    name: string,

): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'SignIn@cscsylhet.com',
            to: email,
            subject: 'Classic School And College',
            react: WelcomeEmail({name}),
          });

        return {success: true, message: 'Welcome email sent successfully'}
    } catch (error) {
        console.error("Error sending welcome email: ", error);
        return {success: false, message: 'Failed to send welcome email'}
    }
}

export async function sendAdminNotificationEmail(
    email: string,
    name: string,
    subject: string, 
    message: string

): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: "CSC Contact <contact@cscsylhet.com>",
            to: [process.env.ADMIN_EMAIL as string],
            subject: `New contact form submission: ${subject}`,
            react: AdminNotificationEmail({ name, email, subject, message }),
          })

        return {success: true, message: 'Welcome email sent successfully'}
    } catch (error) {
        console.error("Error sending welcome email: ", error);
        return {success: false, message: 'Failed to send welcome email'}
    }
}

export async function sendConfirmationEmail(
    email: string,
    name: string,

): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: "Classic School And College <contact@cscsylhet.com>",
            to: [email],
            subject: "We received your message",
            react: ConfirmationEmail({ name }),
          })
      
        return {success: true, message: 'Welcome email sent successfully'}
    } catch (error) {
        console.error("Error sending welcome email: ", error);
        return {success: false, message: 'Failed to send welcome email'}
    }
}