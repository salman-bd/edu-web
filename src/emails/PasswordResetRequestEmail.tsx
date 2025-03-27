import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  Button,
  Img,
} from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

const logoUrl = process.env.WEBSITE_LOGO_URL

interface PasswordResetRequestEmailProps {
  name: string
  resetUrl: string
}

export default function PasswordResetRequestEmail({ name, resetUrl }: PasswordResetRequestEmailProps) {
  const previewText = `Reset your password - Classic School And College`
  const currentYear = new Date().getFullYear()

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto p-4 max-w-[600px]">
            <Section className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header */}
              <Section className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-8 text-center">
                <Img
                  src={logoUrl}
                  width="120"
                  height="120"
                  alt="Classic School And College"
                  className="mx-auto mb-4"
                />
                <Heading className="text-white text-2xl font-bold m-0">Password Reset Request</Heading>
                <Text className="text-indigo-100 text-base mt-2">Follow the instructions to reset your password</Text>
              </Section>

              {/* Content */}
              <Section className="px-8 py-6">
                <Text className="text-gray-700 text-base">
                  Dear <span className="font-semibold">{name}</span>,
                </Text>
                <Text className="text-gray-700 text-base">
                  We received a request to reset your password for your Classic School And College account. If you
                  didn't make this request, you can safely ignore this email.
                </Text>

                <Hr className="border-gray-200 my-6" />

                <Section className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                  <Text className="text-gray-700 text-base font-semibold">To reset your password:</Text>
                  <Text className="text-gray-700 text-sm mt-2">
                    • Click the button below to go to the password reset page
                  </Text>
                  <Text className="text-gray-700 text-sm">
                    • Create a new secure password that you haven't used before
                  </Text>
                  <Text className="text-gray-700 text-sm">• This link will expire in 1 hour for security reasons</Text>
                </Section>

                <Section className="text-center mt-8">
                  <Button
                    className="bg-red-800 text-white font-bold px-6 py-3 rounded-md shadow-sm hover:bg-red-700"
                    href={resetUrl}
                  >
                    Reset Your Password
                  </Button>
                </Section>

                <Text className="text-gray-700 text-base mt-6">
                  If the button above doesn't work, you can copy and paste the following link into your browser:
                </Text>
                <Text className="text-xs text-indigo-600 break-all font-mono bg-gray-100 p-2 rounded">{resetUrl}</Text>
              </Section>

              {/* Footer */}
              <Section className="bg-gray-50 px-8 py-6">
                <Text className="text-gray-600 text-sm">
                  If you didn't request a password reset, please contact our support team at{" "}
                  <Link href="mailto:cscedubd@gmail.com" className="text-indigo-600">
                    cscedubd@gmail.com
                  </Link>{" "}
                  or call{" "}
                  <Link href="tel:+88 01784313268" className="text-indigo-600">
                    +88 01784313268
                  </Link>
                </Text>
                <Hr className="border-gray-200 my-4" />
                <Text className="text-gray-500 text-xs">
                  © {currentYear} Classic School And College. All rights reserved.
                </Text>
                <Text className="text-gray-500 text-xs">Block-D, Main Road, Shahjalal Upashahar, Sylhet</Text>

                <Text className="text-gray-400 text-xs mt-4">
                  This is an automated message, please do not reply to this email.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

