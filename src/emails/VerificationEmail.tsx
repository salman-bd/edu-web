import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text, Hr, Img } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"


const logoUrl = process.env.WEBSITE_LOGO_URL


interface VerificationEmailProps {
  name: string
  otp: string
}

export default function VerificationEmail({ name, otp }: VerificationEmailProps) {
  const previewText = `Your verification code - Classic School And College`
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
                  width="100"
                  height="100"
                  alt="Classic School And College"
                  className="mx-auto mb-4"
                />
                <Heading className="text-gray-600 text-2xl font-bold m-0">Verify Your Email</Heading>
                <Text className="text-600-100 text-base mt-2">Use the code below to verify your account</Text>
              </Section>

              {/* Content */}
              <Section className="px-8 py-6">
                <Text className="text-gray-700 text-base">
                  Dear <span className="font-semibold">{name}</span>,
                </Text>
                <Text className="text-gray-700 text-base">
                  Thank you for registering with Classic School And College. To complete your registration, please use
                  the verification code below:
                </Text>

                <Section className="my-8 text-center">
                  <Text className="font-mono text-3xl font-bold tracking-widest bg-gray-100 py-4 px-6 rounded-lg inline-block text-indigo-600">
                    {otp}
                  </Text>
                </Section>

                <Text className="text-gray-700 text-base">
                  This code will expire in 1 hour. If you did not request this verification code, please ignore this
                  email.
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

