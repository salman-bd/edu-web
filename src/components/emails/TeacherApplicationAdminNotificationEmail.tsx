import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr, Button } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

interface TeacherApplicationAdminNotificationEmailProps {
  applicantName: string
  applicantEmail: string
  subject: string
  applicationId: string
}

export default function TeacherApplicationAdminNotificationEmail({
  applicantName,
  applicantEmail,
  subject,
  applicationId,
}: TeacherApplicationAdminNotificationEmailProps) {
  const previewText = `New teacher application received: ${applicantName} for ${subject}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto p-4 max-w-[600px]">
            <Section className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header */}
              <Section className="bg-indigo-600 p-6 text-center">
                <Heading className="text-white text-2xl font-bold m-0">New Teacher Application Received</Heading>
              </Section>

              {/* Content */}
              <Section className="px-8 py-6">
                <Text className="text-gray-700 text-base">
                  A new teaching application has been submitted to the HR system.
                </Text>

                <Hr className="border-gray-200 my-4" />

                <Text className="text-gray-700 font-semibold">Application Details:</Text>

                <Section className="bg-gray-50 p-4 rounded-md my-4">
                  <Text className="text-gray-700 m-0">
                    <span className="font-semibold">Applicant:</span> {applicantName}
                  </Text>
                  <Text className="text-gray-700 m-0">
                    <span className="font-semibold">Email:</span> {applicantEmail}
                  </Text>
                  <Text className="text-gray-700 m-0">
                    <span className="font-semibold">Subject:</span> {subject}
                  </Text>
                  <Text className="text-gray-700 m-0">
                    <span className="font-semibold">Application ID:</span> {applicationId}
                  </Text>
                  <Text className="text-gray-700 m-0">
                    <span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}
                  </Text>
                </Section>

                <Section className="text-center mt-6">
                  <Button
                    className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-md"
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/careers/${applicationId}`}
                  >
                    Review Application
                  </Button>
                </Section>
              </Section>

              {/* Footer */}
              <Section className="bg-gray-50 px-8 py-4 text-center">
                <Text className="text-gray-500 text-xs">
                  © {new Date().getFullYear()} Classic School And College. All rights reserved.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

