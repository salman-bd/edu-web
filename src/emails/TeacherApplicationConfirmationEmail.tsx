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


interface TeacherApplicationConfirmationEmailProps {
  name: string
  subject: string
  applicationId: string
}

export default function TeacherApplicationConfirmationEmail({
  name,
  subject,
  applicationId,
}: TeacherApplicationConfirmationEmailProps) {
  const previewText = `Your teaching application has been received - Classic School And College`
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
                <Heading className="text-gray-600 text-2xl font-bold m-0">Teaching Application Received</Heading>
                <Text className="text-indigo-600 text-base mt-2">
                  Thank you for your interest in joining our teaching team
                </Text>
              </Section>

              {/* Content */}
              <Section className="px-8 py-6">
                <Text className="text-gray-700 text-base">
                  Dear <span className="font-semibold">{name}</span>,
                </Text>
                <Text className="text-gray-700 text-base">
                  Thank you for your interest in joining our teaching team. We have received your application for the
                  position of <span className="text-indigo-600 font-semibold">{subject} Teacher</span>. We appreciate
                  the time you took to submit your application and share your qualifications with us.
                </Text>
                <Text className="text-gray-700 text-base">
                  Your application has been assigned the reference number:{" "}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-indigo-600">{applicationId}</span>
                </Text>

                <Hr className="border-gray-200 my-6" />

                <Section className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                  <Text className="text-gray-700 text-base font-semibold">What happens next?</Text>
                  <Section className="ml-4">
                    <Text className="text-gray-700 text-base flex items-center">
                      <span className="inline-block w-6 h-6 rounded-full bg-indigo-600 text-white text-center mr-2">
                        1
                      </span>
                      Our HR team will review your application and CV (typically within 7-10 business days)
                    </Text>
                    <Text className="text-gray-700 text-base flex items-center">
                      <span className="inline-block w-6 h-6 rounded-full bg-indigo-600 text-white text-center mr-2">
                        2
                      </span>
                      If your qualifications match our requirements, we&apos;ll contact you to schedule an interview
                    </Text>
                    <Text className="text-gray-700 text-base flex items-center">
                      <span className="inline-block w-6 h-6 rounded-full bg-indigo-600 text-white text-center mr-2">
                        3
                      </span>
                      The interview process may include a teaching demonstration
                    </Text>
                    <Text className="text-gray-700 text-base flex items-center">
                      <span className="inline-block w-6 h-6 rounded-full bg-indigo-600 text-white text-center mr-2">
                        4
                      </span>
                      Final selection will be based on qualifications, experience, and interview performance
                    </Text>
                  </Section>
                </Section>

                <Section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                  <Text className="text-gray-700 text-base font-semibold">Important Information:</Text>
                  <Text className="text-gray-700 text-sm">• Please ensure your contact information is up to date</Text>
                  <Text className="text-gray-700 text-sm">
                    • You may be asked to provide additional documents or references
                  </Text>
                  <Text className="text-gray-700 text-sm">
                    • The entire selection process typically takes 2-4 weeks
                  </Text>
                  <Text className="text-gray-700 text-sm">
                    • We will notify you of your application status regardless of the outcome
                  </Text>
                </Section>

                <Section className="text-center mt-8">
                  <Button
                    className="bg-red-800 text-white font-bold px-6 py-3 rounded-md shadow-sm hover:bg-red-700"
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/application/status/teacher?id=${applicationId}`}
                  >
                    Check Application Status
                  </Button>
                </Section>

                <Text className="text-gray-700 text-base mt-6">
                  Please keep your application ID safe as you&apos;ll need it to check your application status. If you have
                  any questions or need assistance, please don&apos;t hesitate to contact our HR department.
                </Text>
              </Section>

              {/* Footer */}
              <Section className="bg-gray-50 px-8 py-6">
                <Text className="text-gray-600 text-sm">
                  If you have any questions, please contact our HR department at{" "}
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

