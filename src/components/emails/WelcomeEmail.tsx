import { Html, Head, Body, Container, Section, Heading, Text, Button, Tailwind } from "@react-email/components"

interface WelcomeEmailProps {
  name: string
}

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto p-4 max-w-xl">
            <Section className="bg-white rounded-lg shadow-md border border-indigo-100 p-8">
              <Heading className="text-2xl font-bold text-indigo-600 mb-4">
                Welcome to Classic School and College
              </Heading>
              <Text className="text-gray-600 mb-6">Hello {name},</Text>
              <Text className="text-gray-600 mb-6">
                We&apos;re thrilled to have you join our community. Your journey towards excellence in education starts here!
              </Text>
              <Button
                href="https://cscsylhet.com/"
                className="bg-red-800 text-white font-bold py-3 px-6 rounded hover:bg-red-700 text-center"
              >
                Get Started
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

