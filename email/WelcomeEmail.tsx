import { 
  Html, 
  Head,
  Font,
  Heading,
  Row,
  Section,
  Text,

} from "@react-email/components";


interface WelcomeEmailProps {
  name: string;
}



export default function WelcomeEmail({ name }: WelcomeEmailProps) {
return (
  <Html lang="en" dir="ltr">
      <Head>
          <title>Verification Code</title>
          <Font 
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          fontWeight={400}
          />
      </Head>


      <Section>
          <Row>
              <Heading as="h2"> Hello {name} </Heading>
          </Row>
          <Row>
              <Text>
                  Welcome to Classic School and College
              </Text>
          </Row>
          <Row>
              <Text> {} </Text>
          </Row>
          <Row>
              <Text> 
              Thank you for registering. Stay tuned us
              </Text>
          </Row>
      </Section>
      
    {/* <Button href="https://example.com" style={{ color: "#61dafb" }}>
      Click me
    </Button> */}

  </Html>
);
};
