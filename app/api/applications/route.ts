import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import ApplicationReceived from "@/components/utils/Emails/ApplicationReceived";
import Application from "@/components/utils/Emails/Application";
import { applicationSchema } from "./schema";
import { guardApiRequest } from "@/lib/apiSecurity";
import { brandTokens } from "@/lib/designTokens";
import { validateImageFile } from "@/lib/fileValidation";
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
      bucket: "applications",
      expectedContentType: "multipart/form-data",
    });

    if (requestGuard) {
      return requestGuard;
    }

    const formData = await req.formData();

    // Check all uploaded files before parsing with schema
    const files = {
      headshot: formData.get("headshot") as File | null,
      rightSideProfile: formData.get("rightSideProfile") as File | null,
      leftSideProfile: formData.get("leftSideProfile") as File | null,
      fullLength: formData.get("fullLength") as File | null,
    };

    // Validate each file content
    const fileValidationErrors: Record<string, string> = {};
    const detectedMimeTypes: Record<string, string> = {};

    for (const [fieldName, file] of Object.entries(files)) {
      if (file instanceof File) {
        const validation = await validateImageFile(file);
        if (!validation.valid) {
          fileValidationErrors[fieldName] = validation.error || "Invalid file";
        } else if (validation.mimeType) {
          detectedMimeTypes[fieldName] = validation.mimeType;
        }
      }
    }

    // Return early if any files are invalid
    if (Object.keys(fileValidationErrors).length > 0) {
      return NextResponse.json(
        {
          error:
            "One or more uploaded files are invalid. Please use valid JPEG or PNG images.",
        },
        { status: 400 },
      );
    }

    // Convert FormData to object for validation
    const applicationData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      gender: formData.get("gender"),
      age: Number(formData.get("age")),
      address: formData.get("address"),
      instagram: formData.get("instagram"),
      facebook: formData.get("facebook"),
      agencyOption: formData.get("agencyOption"),
      previousAgency: formData.get("previousAgency") || undefined,
      headshot: formData.get("headshot"),
      rightSideProfile: formData.get("rightSideProfile"),
      leftSideProfile: formData.get("leftSideProfile"),
      fullLength: formData.get("fullLength"),
    };

    // Validate data
    const validatedData = applicationSchema.parse(applicationData);
    const { firstName, lastName, email } = validatedData;

    // Send email to applicant
    const { error } = await resend.emails.send({
      from: "Test <onboarding@resend.dev>",
      to: [email],
      subject: `Application Received - ${brandTokens.agencyName}`,
      react: ApplicationReceived({
        firstName,
        lastName,
      }),
    });

    // Send email to agency
    if (agencyEmail) {
      const getExtension = (type: string): string => {
        if (type === "image/jpeg") return "jpg";
        if (type === "image/png") return "png";
        return "jpg"; // default
      };

      const headshotMimeType =
        detectedMimeTypes.headshot || validatedData.headshot.type;
      const rightSideProfileMimeType =
        detectedMimeTypes.rightSideProfile ||
        validatedData.rightSideProfile.type;
      const leftSideProfileMimeType =
        detectedMimeTypes.leftSideProfile || validatedData.leftSideProfile.type;
      const fullLengthMimeType =
        detectedMimeTypes.fullLength || validatedData.fullLength.type;

      const attachments = [
        {
          filename: `headshot_${firstName}_${lastName}.${getExtension(headshotMimeType)}`,
          content: Buffer.from(await validatedData.headshot.arrayBuffer()),
          type: headshotMimeType,
        },
        {
          filename: `right_side_profile_${firstName}_${lastName}.${getExtension(rightSideProfileMimeType)}`,
          content: Buffer.from(
            await validatedData.rightSideProfile.arrayBuffer(),
          ),
          type: rightSideProfileMimeType,
        },
        {
          filename: `left_side_profile_${firstName}_${lastName}.${getExtension(leftSideProfileMimeType)}`,
          content: Buffer.from(
            await validatedData.leftSideProfile.arrayBuffer(),
          ),
          type: leftSideProfileMimeType,
        },
        {
          filename: `full_length_${firstName}_${lastName}.${getExtension(fullLengthMimeType)}`,
          content: Buffer.from(await validatedData.fullLength.arrayBuffer()),
          type: fullLengthMimeType,
        },
      ];

      const { error: agencyError } = await resend.emails.send({
        from: "Test <onboarding@resend.dev>",
        to: [agencyEmail],
        subject: `New Application Received - ${brandTokens.agencyName}`,
        react: Application({
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          age: validatedData.age,
          gender: validatedData.gender,
          address: validatedData.address,
          instagram: validatedData.instagram,
          facebook: validatedData.facebook,
          agencyOption: validatedData.agencyOption,
          previousAgency: validatedData.previousAgency,
        }),
        attachments,
      });
      if (agencyError) {
        logError(
          { endpoint: "/api/applications", action: "send_agency_email" },
          agencyError,
          "Failed to send agency email notification",
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
      { success: true, message: "Application submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      logDebug(
        { endpoint: "/api/applications", action: "validation" },
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
      { endpoint: "/api/applications", action: "process_application" },
      error,
      "Unexpected error during application submission",
    );

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
