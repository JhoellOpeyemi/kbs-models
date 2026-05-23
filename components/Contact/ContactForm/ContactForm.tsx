"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCsrfToken } from "@/hooks/useCsrfToken";
import StyledInput from "@/components/utils/StyledInput/StyledInput";
import StyledSelect from "@/components/utils/StyledSelect/StyledSelect";
import FormBtn from "@/components/ui/FormBtn/FormBtn";

import "./contactForm.css";

const contactSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.email("Enter a valid email"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  purpose: z.string().min(1, "Please select a purpose"),
  message: z.string().min(10, "Please enter a message"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const {
    csrfToken,
    isLoading: isCsrfLoading,
    error: csrfError,
  } = useCsrfToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!csrfToken) {
      setSubmitError(
        csrfError || "Unable to secure the form. Please refresh and try again.",
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          purpose: data.purpose,
          message: data.message,
        }),
      });

      if (!response.ok) {
        const json = await response.json().catch(() => null);
        setSubmitError(
          json?.error || "Failed to submit the form. Please try again.",
        );
        return;
      }

      setSubmitSuccess(true);
      reset(); // Clear form on success
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {(submitError || csrfError) && (
          <div className="error-message">{submitError || csrfError}</div>
        )}

        <div className="contact-form-group">
          <div className="contact-form-input-group">
            <StyledInput
              label="Full Name"
              id="full-name"
              type="text"
              {...register("name")}
              error={errors.name?.message}
            />
            <StyledInput
              label="Email"
              id="email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <StyledInput
              label="Phone Number"
              id="phone"
              type="tel"
              {...register("phone")}
              error={errors.phone?.message}
            />
            <StyledSelect
              label="Purpose"
              id="purpose"
              options={["private consultation", "model training", "enquiries"]}
              {...register("purpose")}
              error={errors.purpose?.message}
            />
          </div>

          <div className="contact-form-textarea-container">
            <textarea
              className="styled-textarea"
              id="message"
              placeholder="Type your message here..."
              {...register("message")}
            />
            {errors.message && (
              <span className="field-error">{errors.message.message}</span>
            )}
          </div>
        </div>

        <FormBtn
          label={
            isSubmitting
              ? "Sending..."
              : isCsrfLoading
                ? "Securing form..."
                : "Send"
          }
          disabled={isSubmitting || isCsrfLoading}
        />

        {submitSuccess && (
          <div className="success-message">Message sent successfully!</div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
