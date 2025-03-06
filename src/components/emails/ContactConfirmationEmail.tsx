import React from "react"
import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text } from "@react-email/components"

interface ConfirmationEmailProps {
  name: string
}

export default function ConfirmationEmail({ name }: ConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for your message</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank You for Your Message</Heading>
          <Text style={text}>Dear {name},</Text>
          <Text style={text}>
            Thank you for reaching out through our contact form. We have received your message and appreciate your
            interest.
          </Text>
          <Section style={section}>
            <Text style={text}>
              We will review your inquiry and get back to you as soon as possible. Please allow up to 48 hours for
              a response.
            </Text>
          </Section>
          <Text style={text}>
            If you have any urgent matters, please don&apos;t hesitate to contact us directly over cell phone.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Best regards,
            <br />
            Classic School And College
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
}

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  paddingTop: "32px",
  paddingBottom: "16px",
}

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  paddingBottom: "10px",
}

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  marginTop: "16px",
  marginBottom: "16px",
}

const hr = {
  borderColor: "#dedede",
  margin: "20px 0",
}

const footer = {
  color: "#898989",
  fontSize: "14px",
  marginTop: "24px",
}

