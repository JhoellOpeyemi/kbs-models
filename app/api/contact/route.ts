import { NextResponse } from "next/server";
import { z } from "zod";
import { guardApiRequest } from "@/lib/apiSecurity";
import { brandTokens } from "@/lib/designTokens";
import { logError, logDebug } from "@/lib/logging";

const WEB3FORMS_SECRET_KEY = process.env.WEB3FORMS_SECRET_KEY;
const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email(),
  phone: z.string().trim().min(10).max(20).regex(/^\d+$/),
  purpose: z.string().trim().min(1).max(100),
  message: z.string().trim().min(10).max(1000),
});

export async function POST(request: Request) {
  try {
    const requestGuard = guardApiRequest(request, {
      bucket: "contact",
      expectedContentType: "application/json",
    });

    if (requestGuard) {
      return requestGuard;
    }

    if (!WEB3FORMS_SECRET_KEY) {
      logError(
        { endpoint: "/api/contact", action: "submit_contact_form" },
        "missing_web3forms_secret",
        "WEB3FORMS_SECRET_KEY environment variable is not configured",
      );
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const validatedData = contactSchema.parse(body);

    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_SECRET_KEY);
    formData.append(
      "subject",
      `New contact request from ${brandTokens.agencyName} website`,
    );
    formData.append("from_name", validatedData.name);
    formData.append("email", validatedData.email);
    formData.append("phone", validatedData.phone);
    formData.append("purpose", validatedData.purpose);
    formData.append("message", validatedData.message);

    const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    if (!web3formsResponse.ok) {
      const errorData = await web3formsResponse.text().catch(() => "unknown");
      logError(
        { endpoint: "/api/contact", action: "forward_to_web3forms" },
        errorData,
        "Web3Forms request failed",
      );
      return NextResponse.json(
        { error: "Failed to submit form. Please try again." },
        { status: web3formsResponse.status },
      );
    }

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      logDebug(
        { endpoint: "/api/contact", action: "validation" },
        "Contact validation error occurred",
        { errorCount: error.issues.length },
      );

      return NextResponse.json(
        { error: "Validation failed. Please check your inputs and try again." },
        { status: 400 },
      );
    }

    logError(
      { endpoint: "/api/contact", action: "submit_contact_form" },
      error,
      "Unexpected error during contact submission",
    );

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * Handle other HTTP methods with 405 Method Not Allowed
 */
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
