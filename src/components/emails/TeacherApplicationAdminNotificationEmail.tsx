import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr, Button, Img } from "@react-email/components"
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
  const currentYear = new Date().getFullYear()
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto p-4 max-w-[600px]">
            <Section className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header */}
              <Section className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 text-center">
                <Img
                  src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.png`}
                  width="100"
                  height="32"
                  alt="Classic School And College"
                  className="mx-auto mb-2"
                />
                <Heading className="text-white text-2xl font-bold m-0">New Teacher Application</Heading>
              </Section>

              {/* Content */}
              <Section className="px-8 py-6">
                <Text className="text-gray-700 text-base">
                  A new teaching application has been submitted to the HR system.
                </Text>

                <Hr className="border-gray-200 my-4" />

                <Text className="text-gray-700 font-semibold">Application Details:</Text>

                <Section className="bg-gray-50 p-4 rounded-md my-4 border border-gray-200">
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
                    <span className="font-semibold">Date:</span> {currentDate}
                  </Text>
                </Section>

                <Section className="bg-blue-50 p-4 rounded-md my-4 border border-blue-200">
                  <Text className="text-gray-700 m-0 font-semibold">HR Process Checklist:</Text>
                  <Text className="text-gray-700 m-0">• Review CV and application details</Text>
                  <Text className="text-gray-700 m-0">• Verify teaching credentials and experience</Text>
                  <Text className="text-gray-700 m-0">• Check references if initial review is positive</Text>
                  <Text className="text-gray-700 m-0">
                    • Schedule interview and teaching demonstration if qualified
                  </Text>
                </Section>

                <Section className="bg-green-50 p-4 rounded-md my-4 border border-green-200">
                  <Text className="text-gray-700 m-0 font-semibold">Current Staffing Status:</Text>
                  <Text className="text-gray-700 m-0">
                    This application is for the {subject} teaching position, which is currently a priority hiring area.
                  </Text>
                </Section>

                <Section className="text-center mt-6">
                  <Button
                    className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-md shadow-sm hover:bg-indigo-700"
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/teacher-applications/${applicationId}`}
                  >
                    Review Application
                  </Button>
                </Section>
              </Section>

              {/* Footer */}
              <Section className="bg-gray-50 px-8 py-4 text-center">
                <Text className="text-gray-500 text-xs">
                  © {currentYear} Classic School And College. All rights reserved.
                </Text>
                <Text className="text-gray-500 text-xs">This is an automated notification from the HR system.</Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

