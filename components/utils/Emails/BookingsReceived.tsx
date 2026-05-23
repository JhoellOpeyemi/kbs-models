import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Heading,
} from "@react-email/components";
import { brandTokens } from "@/lib/designTokens";

interface BookingsReceivedProps {
  clientName: string;
  modelName: string;
  eventDate: string;
}

export default function BookingsReceived({
  clientName,
  modelName,
  eventDate,
}: BookingsReceivedProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {`We've received your booking request - Thank you for choosing ${brandTokens.agencyName}`}
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.content}>
            <Heading as="h2" style={styles.heading}>
              Booking Received
            </Heading>

            <Text style={styles.text}>Hi {clientName},</Text>
            <Text style={styles.text}>
              Thank you for reaching out to{" "}
              <strong>{brandTokens.agencyName}</strong>. We&apos;ve received
              your booking request for <strong>{modelName}</strong> on{" "}
              <strong>{eventDate}</strong>.
            </Text>

            <Text style={styles.text}>
              Our team will review your request and contact you shortly for
              confirmation details or any additional information we might need.
            </Text>

            <Text style={styles.text}>
              If you have any questions in the meantime, feel free to reach out
              to us at{" "}
              <a href={`mailto:${brandTokens.agencyEmail}`} style={styles.link}>
                {brandTokens.agencyEmail}
              </a>
            </Text>

            <Text style={styles.text}>
              {`We appreciate your trust in ${brandTokens.agencyName} and look forward to making your project a success.`}
            </Text>

            <Hr style={styles.hr} />

            <Text style={styles.footer}>
              This is an automated message, please do not reply directly to this
              email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f8f7f5",
    fontFamily: "Helvetica, Arial, sans-serif",
    color: "#1b1b1b",
    padding: "20px",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "32px",
    borderRadius: "8px",
  },
  content: {
    textAlign: "left" as const,
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold" as const,
    marginBottom: "16px",
    color: "#111",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "12px",
    color: "#333",
  },
  link: {
    color: "#8b5e3c",
    textDecoration: "none",
  },
  hr: {
    margin: "32px 0 16px 0",
    borderColor: "#e2e2e2",
  },
  footer: {
    fontSize: "12px",
    color: "#888",
  },
};
