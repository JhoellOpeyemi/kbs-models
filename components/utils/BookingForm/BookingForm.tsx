import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { bookingSchema } from "@/app/api/bookings/schema";
import { useCsrfToken } from "@/hooks/useCsrfToken";

import FormBtn from "@/components/ui/FormBtn/FormBtn";
import FormSuccess from "@/components/ui/FormSuccess/FormSuccess";

import "./bookingForm.css";

export type BookingFormData = z.input<typeof bookingSchema>;

interface BookingFormProps {
  closeBookingModal: () => void;
  modelName: string | undefined;
}

const BookingForm = ({ closeBookingModal, modelName }: BookingFormProps) => {
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
  } = useForm<BookingFormData>({
    defaultValues: { modelName: modelName },
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
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
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          closeBookingModal();
        }, 3000);
      } else {
        const errorData = await response.json().catch(() => null);
        setSubmitError(
          errorData?.error || "An error occurred while submitting the booking.",
        );
      }
    } catch (error) {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="booking-form-backdrop" />
      <section className="booking-form-container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <button
            aria-label="Close Booking Form"
            className="close-form-btn"
            onClick={closeBookingModal}
          >
            (X)
          </button>

          {(submitError || csrfError) && (
            <div className="error-message">{submitError || csrfError}</div>
          )}

          <div className="input-group-container">
            <div className="input-group">
              <label htmlFor="modelName" className="styled-input-label">
                Model
              </label>
              <input
                {...register("modelName")}
                type="text"
                id="modelName"
                className="styled-input"
                readOnly
              />
              {errors.modelName && (
                <span className="field-error">{errors.modelName.message}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="clientName" className="styled-input-label">
                Your Name
              </label>
              <input
                {...register("clientName")}
                type="text"
                id="clientName"
                className="styled-input"
                placeholder="John Doe"
              />
              {errors.clientName && (
                <span className="field-error">{errors.clientName.message}</span>
              )}
            </div>
          </div>

          <div className="input-group-container">
            <div className="input-group">
              <label htmlFor="email" className="styled-input-label">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="styled-input"
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <span className="field-error">{errors.email.message}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="eventDate" className="styled-input-label">
                Event Date
              </label>
              <input
                {...register("eventDate")}
                type="date"
                id="eventDate"
                className="styled-input"
              />
              {errors.eventDate && (
                <span className="field-error">{errors.eventDate.message}</span>
              )}
            </div>
          </div>

          <div className="textarea-input-group">
            <label htmlFor="message" className="styled-input-label">
              Message
            </label>
            <textarea
              {...register("message")}
              id="message"
              className="styled-textarea"
              placeholder="Type your message here..."
            />
            {errors.message && (
              <span className="field-error">{errors.message.message}</span>
            )}
          </div>

          <FormBtn
            label={
              isSubmitting
                ? "Submitting..."
                : isCsrfLoading
                  ? "Securing form..."
                  : "Send Booking Request"
            }
            disabled={isSubmitting || isCsrfLoading}
          />

          {submitSuccess && (
            <FormSuccess message="Booking submitted successfully!" />
          )}
        </form>
      </section>
    </>
  );
};

export default BookingForm;
