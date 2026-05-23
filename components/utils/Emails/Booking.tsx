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

interface BookingProps {
  clientName: string;
  modelName: string;
  email: string;
  eventDate: string;
  message: string;
}

export default function Booking({
  clientName,
  modelName,
  email,
  eventDate,
  message,
}: BookingProps) {
  return (
    <Html>
      <Head />
      <Preview>{`New Booking Request Received - ${brandTokens.agencyName}`}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.content}>
            <Heading as="h2" style={styles.heading}>
              New Booking Request Received
            </Heading>

            <Text style={styles.text}>
              {`A new booking request has been submitted for ${brandTokens.agencyName}.`}
            </Text>

            <Text style={styles.text}>
              <strong>Client Details:</strong>
            </Text>
            <Text style={styles.text}>Name: {clientName}</Text>
            <Text style={styles.text}>Email: {email}</Text>

            <Text style={styles.text}>
              <strong>Booking Details:</strong>
            </Text>
            <Text style={styles.text}>Model: {modelName}</Text>
            <Text style={styles.text}>Event Date: {eventDate}</Text>
            <Text style={styles.text}>Message: {message}</Text>

            <Text style={styles.text}>
              Please review the booking request and contact the client for
              confirmation.
            </Text>

            <Hr style={styles.hr} />

            <Text style={styles.footer}>{brandTokens.agencyTeamName}</Text>
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
