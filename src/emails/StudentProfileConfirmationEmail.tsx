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


interface StudentProfileConfirmationEmailProps {
  name: string
  email: string
  profileId: string
}

export default function StudentProfileConfirmationEmail({
  name,
  profileId,
}: StudentProfileConfirmationEmailProps) {
  const previewText = `Your student profile has been updated - Classic School And College`
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
                <Heading className="text-white text-2xl font-bold m-0">Student Profile Updated</Heading>
                <Text className="text-indigo-100 text-base mt-2">
                  Your profile information has been successfully updated
                </Text>
              </Section>

              {/* Content */}
              <Section className="px-8 py-6">
                <Text className="text-gray-700 text-base">
                  Dear <span className="font-semibold">{name}</span>,
                </Text>
                <Text className="text-gray-700 text-base">
                  Thank you for updating your student profile information. Your profile has been successfully updated in
                  our system. This information will be used to provide you with personalized educational services and
                  support.
                </Text>
                <Text className="text-gray-700 text-base">
                  Your profile ID is:{" "}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-indigo-600">{profileId}</span>
                </Text>

                <Hr className="border-gray-200 my-6" />

                <Section className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                  <Text className="text-gray-700 text-base font-semibold">Profile Information:</Text>
                  <Text className="text-gray-700 text-sm mt-2">
                    • Your profile includes your personal information, educational background, and contact details
                  </Text>
                  <Text className="text-gray-700 text-sm">
                    • Your personal statement is now visible to your teachers and academic advisors
                  </Text>
                  <Text className="text-gray-700 text-sm">
                    • Your profile photo has been updated and will be displayed on the school portal
                  </Text>
                  <Text className="text-gray-700 text-sm">
                    • You can update your profile information at any time through the student portal
                  </Text>
                </Section>

                <Section className="text-center mt-8">
                  <Button
                    className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-md shadow-sm hover:bg-indigo-700"
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/student/profile/view?id=${profileId}`}
                  >
                    View Your Profile
                  </Button>
                </Section>

                <Text className="text-gray-700 text-base mt-6">
                  If you notice any errors in your profile or need to make additional changes, you can log in to the
                  student portal and update your information at any time.
                </Text>
              </Section>

              {/* Footer */}
              <Section className="bg-gray-50 px-8 py-6">
                <Text className="text-gray-600 text-sm">
                  If you have any questions, please contact our student services department at{" "}
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
