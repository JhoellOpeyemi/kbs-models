import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { brandTokens } from "@/lib/designTokens";

interface ApplicationReceivedProps {
  firstName: string;
  lastName: string;
}

export default function ApplicationReceived({
  firstName,
  lastName,
}: ApplicationReceivedProps) {
  return (
    <Html>
      <Head />
      <Preview>Your application has been received</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>Application Received</Text>
            <Hr style={hr} />
            <Text style={paragraph}>
              Hi {firstName} {lastName},
            </Text>
            <Text style={paragraph}>
              {`Thank you for submitting your application to ${brandTokens.agencyName}. We have received your application and it is now being reviewed by our team.`}
            </Text>
            <Text style={paragraph}>
              We are impressed by your interest and will be in touch shortly
              with updates on your application status. Our team carefully
              reviews each application, and we will contact you as soon as a
              decision has been made.
            </Text>
            <Text style={paragraph}>
              In the meantime, if you have any questions or need to provide
              additional information, please don't hesitate to reach out to us.
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              Best regards,
              <br />
              {brandTokens.agencyTeamName}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f9fafb",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const heading = {
  fontSize: "32px",
  fontWeight: "700",
  margin: "16px 0",
  padding: "0",
  color: "#795119",
};

const paragraph = {
  color: "#525252",
  fontSize: "16px",
  lineHeight: "1.5",
  textAlign: "left" as const,
  margin: "16px 0",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
};

const footer = {
  color: "#888888",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "16px 0",
};
