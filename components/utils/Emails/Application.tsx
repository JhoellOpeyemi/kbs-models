import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { brandTokens } from "@/lib/designTokens";

interface ApplicationProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  address: string;
  instagram?: string;
  facebook?: string;
  agencyOption: string;
  previousAgency?: string;
}

export default function Application({
  firstName,
  lastName,
  email,
  phone,
  age,
  gender,
  address,
  instagram,
  facebook,
  agencyOption,
  previousAgency,
}: ApplicationProps) {
  return (
    <Html>
      <Head />
      <Preview>{`New Application Received - ${brandTokens.agencyName}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>New Application Received</Text>
            <Hr style={hr} />
            <Text style={paragraph}>
              {`A new application has been submitted to ${brandTokens.agencyName}.`}
            </Text>
            <Text style={paragraph}>
              <strong>Applicant Details:</strong>
            </Text>
            <Text style={paragraph}>
              Name: {firstName} {lastName}
            </Text>
            <Text style={paragraph}>Email: {email}</Text>
            <Text style={paragraph}>Phone: {phone}</Text>
            <Text style={paragraph}>Age: {age}</Text>
            <Text style={paragraph}>Gender: {gender}</Text>
            <Text style={paragraph}>Address: {address}</Text>
            {instagram && <Text style={paragraph}>Instagram: {instagram}</Text>}
            {facebook && <Text style={paragraph}>Facebook: {facebook}</Text>}
            <Text style={paragraph}>Agency Option: {agencyOption}</Text>
            {previousAgency && (
              <Text style={paragraph}>Previous Agency: {previousAgency}</Text>
            )}
            <Text style={paragraph}>
              Please review the application and attached photos.
            </Text>
            <Hr style={hr} />
            <Text style={footer}>{brandTokens.agencyTeamName}</Text>
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
  color: "#525252",
  fontSize: "14px",
  lineHeight: "1.5",
  textAlign: "left" as const,
  margin: "16px 0",
};
