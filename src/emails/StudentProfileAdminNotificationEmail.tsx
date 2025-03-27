import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr, Button, Img } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

const logoUrl = process.env.WEBSITE_LOGO_URL


interface StudentProfileAdminNotificationEmailProps {
  studentName: string
  studentEmail: string
  programType: string
  profileId: string
  isNewProfile: boolean
}

export default function StudentProfileAdminNotificationEmail({
  studentName,
  studentEmail,
  programType,
  profileId,
  isNewProfile = false,
}: StudentProfileAdminNotificationEmailProps) {
  const previewText = isNewProfile
    ? `New student profile created: ${studentName}`
    : `Student profile updated: ${studentName}`

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
              <Section className="p-6 text-center">
                <Img
                  src={logoUrl}
                  width="100"
                  height="100"
                  alt="Classic School And College"
                  className="mx-auto mb-2"
                />
                <Heading className="text-gray-600 text-2xl font-bold m-0">
                  {isNewProfile ? "New Student Profile Created" : "Student Profile Updated"}
                </Heading>
              </Section>

              {/* Content */}
              <Section className="px-8 py-6">
                <Text className="text-gray-700 text-base">
                  {isNewProfile
                    ? "A new student profile has been created in the system."
                    : "A student has updated their profile information."}
                </Text>

                <Hr className="border-gray-200 my-4" />

                <Text className="text-gray-700 font-semibold">Profile Details:</Text>

                <Section className="bg-gray-50 p-4 rounded-md my-4 border border-gray-200">
                  <Text className="text-gray-700 m-0">
                    <span className="font-semibold">Student:</span> {studentName}
                  </Text>
                  <Text className="text-gray-700 m-0">
                    <span className="font-semibold">Email:</span> {studentEmail}
                  </Text>
                  <Text className="text-gray-700 m-0">
                    <span className="font-semibold">Program:</span> {programType}
                  </Text>
                  <Text className="text-gray-700 m-0">
                    <span className="font-semibold">Profile ID:</span> {profileId}
                  </Text>
                  <Text className="text-gray-700 m-0">
                    <span className="font-semibold">Date:</span> {currentDate}
                  </Text>
                </Section>

                <Section className="bg-blue-50 p-4 rounded-md my-4 border border-blue-200">
                  <Text className="text-gray-700 m-0 font-semibold">Admin Actions:</Text>
                  <Text className="text-gray-700 m-0">• Review the updated profile information</Text>
                  <Text className="text-gray-700 m-0">• Verify student enrollment status</Text>
                  <Text className="text-gray-700 m-0">• Approve the profile for system access</Text>
                  <Text className="text-gray-700 m-0">• Update the student directory in the system</Text>
                </Section>

                <Section className="text-center mt-6">
                  <Button
                    className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-md shadow-sm hover:bg-indigo-700"
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/admin/student/profile?id=${profileId}`}
                  >
                    Review Profile
                  </Button>
                </Section>
              </Section>

              {/* Footer */}
              <Section className="bg-gray-50 px-8 py-4 text-center">
                <Text className="text-gray-500 text-xs">
                  © {currentYear} Classic School And College. All rights reserved.
                </Text>
                <Text className="text-gray-500 text-xs">
                  This is an automated notification from the student management system.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

