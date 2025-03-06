import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Hr,
    Button,
  } from "@react-email/components"
  import { Tailwind } from "@react-email/tailwind"
  
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
    const previewText = `Your teaching application has been received`
  
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
                  <Img
                    src='/CSC-LOGO-BR.png'
                    width="120"
                    height="50"
                    alt="School Logo"
                    className="mx-auto mb-4"
                  />
                  <Heading className="text-white text-2xl font-bold m-0">Teaching Application Received</Heading>
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
  
                  <Text className="text-gray-700 text-base font-semibold">What happens next?</Text>
                  <Text className="text-gray-700 text-base">
                    1. Our HR team will review your application and CV (typically within 7-10 business days)
                  </Text>
                  <Text className="text-gray-700 text-base">
                    2. If your qualifications match our requirements, we'll contact you to schedule an interview
                  </Text>
                  <Text className="text-gray-700 text-base">
                    3. The interview process may include a teaching demonstration
                  </Text>
                  <Text className="text-gray-700 text-base">
                    4. Final selection will be based on qualifications, experience, and interview performance
                  </Text>
  
                  {/* <Section className="text-center mt-8">
                    <Button
                      className="bg-red-800 text-white font-bold px-6 py-3 rounded-md"
                      href={`${process.env.NEXT_PUBLIC_APP_URL}/careers/status?id=${applicationId}`}
                    >
                      Check Application Status
                    </Button>
                  </Section> */}
                </Section>
  
                {/* Footer */}
                <Section className="bg-gray-50 px-8 py-6 text-center">
                  <Text className="text-gray-600 text-sm">
                    If you have any questions, please contact our HR department at{" "}
                    <Link href="cscedubd@gmail.com" className="text-indigo-600">
                      cscedubd@gmail.com
                    </Link>{" "}
                    or call{" "}
                    <Link href="tel:+11234567890" className="text-indigo-600">
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
  
  