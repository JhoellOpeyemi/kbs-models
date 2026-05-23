/**
 * File signatures (magic bytes) for supported image types
 * These are the first few bytes of the actual file and cannot be spoofed
 */
const FILE_SIGNATURES: Record<string, Uint8Array[]> = {
  "image/jpeg": [
    new Uint8Array([0xff, 0xd8, 0xff]), // JPEG signature
  ],
  "image/png": [
    new Uint8Array([0x89, 0x50, 0x4e, 0x47]), // PNG signature (89 50 4E 47)
  ],
};

/**
 * Validate file content by checking magic bytes
 * Prevents MIME type spoofing attacks
 *
 * @param buffer - File buffer to validate
 * @param allowedMimes - List of allowed MIME types (e.g., ['image/jpeg', 'image/png'])
 * @returns Object with isValid flag and detected mime type
 */
export async function validateFileContent(
  buffer: Buffer,
  allowedMimes: string[],
): Promise<{ isValid: boolean; mimeType: string | null }> {
  if (!buffer || buffer.length === 0) {
    return { isValid: false, mimeType: null };
  }

  // Check each allowed MIME type signature
  for (const mimeType of allowedMimes) {
    const signatures = FILE_SIGNATURES[mimeType];
    if (!signatures) continue;

    // Check if buffer starts with any of the signatures for this MIME type
    for (const signature of signatures) {
      if (buffer.length < signature.length) continue;

      const bufferStart = buffer.subarray(0, signature.length);
      if (bufferStart.every((byte, index) => byte === signature[index])) {
        return { isValid: true, mimeType };
      }
    }
  }

  return { isValid: false, mimeType: null };
}

/**
 * Validate image file
 * Checks file size and content validity
 *
 * @param file - File object from FormData
 * @param maxSizeMB - Maximum file size in MB (default: 5)
 * @returns Promise with validation result
 */
export async function validateImageFile(
  file: File,
  maxSizeMB: number = 5,
): Promise<{
  valid: boolean;
  mimeType?: string;
  error?: string;
}> {
  const ALLOWED_MIMES = ["image/jpeg", "image/png"];
  const MAX_SIZE = maxSizeMB * 1024 * 1024;

  // Check file size
  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: `File size must be less than ${maxSizeMB}MB`,
    };
  }

  // Check file size is not zero
  if (file.size === 0) {
    return {
      valid: false,
      error: "File is empty",
    };
  }

  try {
    // Convert file to buffer and validate content
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { isValid, mimeType } = await validateFileContent(
      buffer,
      ALLOWED_MIMES,
    );

    if (!isValid) {
      return {
        valid: false,
        error: "Invalid file content. File must be a valid JPEG or PNG image.",
      };
    }

    return {
      valid: true,
      mimeType: mimeType || undefined,
    };
  } catch (error) {
    return {
      valid: false,
      error: "Failed to validate file content",
    };
  }
}

/**
 * Validate multiple image files
 *
 * @param files - Array of File objects
 * @param fieldNames - Names of fields for error messages
 * @returns Promise with validation results
 */
export async function validateImageFiles(
  files: File[],
  fieldNames: string[],
): Promise<{
  valid: boolean;
  mimeTypes?: Record<string, string>;
  errors?: Record<string, string>;
}> {
  const errors: Record<string, string> = {};
  const mimeTypes: Record<string, string> = {};

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fieldName = fieldNames[i];

    const result = await validateImageFile(file);
    if (!result.valid) {
      errors[fieldName] = result.error || "Invalid file";
      continue;
    }

    if (result.mimeType) {
      mimeTypes[fieldName] = result.mimeType;
    }
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, mimeTypes };
}
