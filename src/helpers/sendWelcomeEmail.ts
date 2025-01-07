import { resend } from "@/lib/resend";
import WelcomeEmail from "../../email/WelcomeEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendWelcomeEmail(
    email: string,
    name: string,

): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
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