import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text, Hr, Button } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"
import { EmailLogo } from "./EmailLogo"

interface ApplicationConfirmationEmailProps {
  name: string
  programType: string
  applicationId: string
}

export default function ApplicationConfirmationEmail({
  name,
  programType,
  applicationId,
}: ApplicationConfirmationEmailProps) {
  const previewText = `Your application has been received`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto p-4 max-w-[600px]">
            <Section className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header */}
              <Section className="bg-indigo-600 p-8 text-center">
                <EmailLogo />
                <Heading className="text-white text-2xl font-bold m-0">Application Received</Heading>
              </Section>

              {/* Content */}
              <Section className="px-8 py-6">
                <Text className="text-gray-700 text-base">
                  Dear <span className="font-semibold">{name}</span>,
                </Text>
                <Text className="text-gray-700 text-base">
                  Thank you for submitting your application to our{" "}
                  <span className="text-indigo-600 font-semibold">{programType}</span> program. We are excited about
                  your interest in joining our educational community.
                </Text>
                <Text className="text-gray-700 text-base">
                  Your application has been received and is currently under review by our admissions team. Your
                  application ID is:{" "}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-indigo-600">{applicationId}</span>
                </Text>

                <Hr className="border-gray-200 my-6" />

                <Text className="text-gray-700 text-base font-semibold">What happens next?</Text>
                <Text className="text-gray-700 text-base">
                  1. Our admissions team will review your application (typically within 5-7 business days)
                </Text>
                <Text className="text-gray-700 text-base">
                  2. We may contact you for additional information or to schedule an interview
                </Text>
                <Text className="text-gray-700 text-base">
                  3. You'll receive a decision regarding your application status
                </Text>

                <Section className="text-center mt-8">
                  <Button
                    className="bg-red-800 text-white font-bold px-6 py-3 rounded-md"
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/application-status?id=${applicationId}`}
                  >
                    Check Application Status
                  </Button>
                </Section>
              </Section>

              {/* Footer */}
              <Section className="bg-gray-50 px-8 py-6 text-center">
                <Text className="text-gray-600 text-sm">
                  If you have any questions, please contact our admissions office at{" "}
                  <Link href="mailto:admissions@example.edu" className="text-indigo-600">
                    cdcedubd@gmail.com
                  </Link>{" "}
                  or call{" "}
                  <Link href="tel:+88 01784313268" className="text-indigo-600">
                    +88 01784313268
                  </Link>
                </Text>
                <Hr className="border-gray-200 my-4" />
                <Text className="text-gray-500 text-xs">
                  © {new Date().getFullYear()} Classic School And College. All rights reserved.
                </Text>
                <Text className="text-gray-500 text-xs">Block-D, Main Road, Shahjalal Upashahar, Sylhet</Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

