import React from "react"
import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text } from "@react-email/components"

interface AdminNotificationEmailProps {
  name: string
  email: string
  subject: string
  message: string
}

export default function AdminNotificationEmail({ name, email, subject, message }: AdminNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>
          <Text style={text}>A new message from Classic School And College website&apos;s contact form.</Text>
          <Section style={section}>
            <Text style={text}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={text}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={text}>
              <strong>Subject:</strong> {subject}
            </Text>
            <Hr style={hr} />
            <Text style={text}>
              <strong>Message:</strong>
            </Text>
            <Text style={text}>{message}</Text>
          </Section>
          <Text style={footer}>This is an automated email from Classic School And College website.</Text>
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
  fontSize: "12px",
  marginTop: "24px",
}

