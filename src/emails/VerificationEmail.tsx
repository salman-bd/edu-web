import { Html, Head, Body, Container, Section, Heading, Text, Hr, Tailwind } from "@react-email/components"

interface VerificationEmailProps {
  name: string
  otp: string
}

export default function VerificationEmail({ name, otp }: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto p-4 max-w-xl">
            <Section className="bg-white rounded-lg shadow-md border border-indigo-100 p-8">
              <Heading className="text-2xl font-bold text-indigo-600 mb-4">Verify Your Email</Heading>
              <Text className="text-gray-600 mb-6">Hello {name},</Text>
              <Text className="text-gray-600 mb-6">
                Thank you for registering. Please use the following verification code to complete your registration:
              </Text>
              <Section className="bg-indigo-100 rounded-lg p-4 text-center mb-6">
                <Text className="text-3xl font-bold text-indigo-600">{otp}</Text>
              </Section>
              <Text className="text-gray-600 mb-6">If you did not request this code, please ignore this email.</Text>
              <Hr className="border-t border-gray-300 my-6" />
              <Text className="text-sm text-gray-500 text-center">
                This is an automated email. Please do not reply.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

