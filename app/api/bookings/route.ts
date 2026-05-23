import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import BookingsReceived from "@/components/utils/Emails/BookingsReceived";
import Booking from "@/components/utils/Emails/Booking";
import { bookingSchema } from "./schema";
import { guardApiRequest } from "@/lib/apiSecurity";
import { brandTokens } from "@/lib/designTokens";
import { logError, logDebug } from "@/lib/logging";

const apiKey = process.env.RESEND_API_KEY;
const agencyEmail = process.env.AGENCY_EMAIL;

if (!apiKey) {
  console.error(
    "[CRITICAL] RESEND_API_KEY environment variable is not configured",
  );
}

const resend = new Resend(apiKey);

export async function POST(req: Request) {
  try {
    const requestGuard = guardApiRequest(req, {
      bucket: "bookings",
      expectedContentType: "application/json",
    });

    if (requestGuard) {
      return requestGuard;
    }

    const body = await req.json();
    const validatedData = bookingSchema.parse(body);

    const { modelName, clientName, email, eventDate } = validatedData;
    const eventDateStr =
      eventDate instanceof Date
        ? eventDate.toISOString().split("T")[0]
        : String(eventDate);

    // Send email to client
    const { error } = await resend.emails.send({
      from: "Test <onboarding@resend.dev>",
      to: [email],
      subject: `Booking Request Received - ${brandTokens.agencyName}`,
      react: BookingsReceived({
        clientName,
        modelName,
        eventDate: eventDateStr,
      }),
    });

    // send email to agency
    if (agencyEmail) {
      const { error: agencyError } = await resend.emails.send({
        from: "Test <onboarding@resend.dev>",
        to: [agencyEmail],
        subject: `New Booking Received - ${brandTokens.agencyName}`,
        react: Booking({
          clientName: validatedData.clientName,
          modelName: validatedData.modelName,
          email: validatedData.email,
          eventDate: eventDateStr,
          message: validatedData.message,
        }),
      });
      if (agencyError) {
        logError(
          { endpoint: "/api/bookings", action: "send_agency_email" },
          agencyError,
          "Failed to send agency booking notification",
        );
      }
    }

    if (error) {
      return NextResponse.json(
        { error: "Failed to send confirmation email. Please try again" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Booking submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      logDebug(
        { endpoint: "/api/bookings", action: "validation" },
        "Validation error occurred",
        {
          errorCount: error.issues.length,
        },
      );

      return NextResponse.json(
        { error: "Validation failed. Please check your inputs and try again." },
        { status: 400 },
      );
    }

    logError(
      { endpoint: "/api/bookings", action: "process_booking" },
      error,
      "Unexpected error during booking submission",
    );

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
