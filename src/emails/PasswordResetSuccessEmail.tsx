import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text, Hr, Img } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

const logoUrl = process.env.WEBSITE_LOGO_URL


interface PasswordResetSuccessEmailProps {
  name: string
}

export default function PasswordResetSuccessEmail({ name }: PasswordResetSuccessEmailProps) {
  const previewText = `Your password has been reset successfully - Classic School And College`
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
              <Section className="p-8 text-center">
                <Img
                  src={logoUrl}
                  width="100"
                  height="100"
                  alt="Classic School And College"
                  className="mx-auto mb-4"
                />
                <Heading className="text-gray-600 text-2xl font-bold m-0">Password Reset Successful</Heading>
                <Text className="text-indigo-600 text-base mt-2">Your password has been updated</Text>
              </Section>

              {/* Content */}
              <Section className="px-8 py-6">
                <Text className="text-gray-700 text-base">
                  Dear <span className="font-semibold">{name}</span>,
                </Text>
                <Text className="text-gray-700 text-base">
                  Your password for your Classic School And College account has been successfully reset. You can now log
                  in with your new password.
                </Text>

                <Hr className="border-gray-200 my-6" />

                <Section className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                  <Text className="text-gray-700 text-base font-semibold">Security Recommendations:</Text>
                  <Text className="text-gray-700 text-sm mt-2">• Never share your password with anyone</Text>
                  <Text className="text-gray-700 text-sm">
                    • Use a unique password that you don't use for other accounts
                  </Text>
                  <Text className="text-gray-700 text-sm">• Consider changing your password periodically</Text>
                  <Text className="text-gray-700 text-sm">• Make sure to log out when using shared computers</Text>
                </Section>

                <Text className="text-gray-700 text-base mt-6">
                  If you did not request this password change, please contact our support team immediately.
                </Text>
              </Section>

              {/* Footer */}
              <Section className="bg-gray-50 px-8 py-6">
                <Text className="text-gray-600 text-sm">
                  If you have any questions, please contact our support team at{" "}
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

