"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { applicationSchema } from "@/app/api/applications/schema";
import { useCsrfToken } from "@/hooks/useCsrfToken";
import FormBtn from "@/components/ui/FormBtn/FormBtn";
import FormSuccess from "@/components/ui/FormSuccess/FormSuccess";
import "./applyForm.css";

export type ApplicationFormData = z.input<typeof applicationSchema>;

const ApplyForm = () => {
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
    control,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit: SubmitHandler<ApplicationFormData> = async (data) => {
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
      const formData = new FormData();

      // Append all fields
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        body: formData,
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        const errorData = await response.json().catch(() => null);
        setSubmitError(
          errorData?.error ||
            "An error occurred while submitting the application.",
        );
      }
    } catch (error) {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="apply-form-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {(submitError || csrfError) && (
          <div className="error-message">{submitError || csrfError}</div>
        )}

        <fieldset disabled={isSubmitting} className="apply-form-fieldset">
          <div className="apply-form-input-group">
            <div className="input-group">
              <label htmlFor="firstName" className="styled-input-label">
                First Name
              </label>
              <input
                {...register("firstName")}
                id="firstName"
                type="text"
                className="styled-input"
                placeholder="John"
              />
              {errors.firstName && (
                <span className="field-error">{errors.firstName.message}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="lastName" className="styled-input-label">
                Last Name
              </label>
              <input
                {...register("lastName")}
                id="lastName"
                type="text"
                className="styled-input"
                placeholder="Doe"
              />
              {errors.lastName && (
                <span className="field-error">{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <div className="apply-form-input-group">
            <div className="input-group">
              <label htmlFor="email" className="styled-input-label">
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                className="styled-input"
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <span className="field-error">{errors.email.message}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="phone" className="styled-input-label">
                Phone Number
              </label>
              <input
                {...register("phone")}
                id="phone"
                type="tel"
                className="styled-input"
                placeholder="1234567890"
              />
              {errors.phone && (
                <span className="field-error">{errors.phone.message}</span>
              )}
            </div>
          </div>

          <div className="apply-form-input-group">
            <div className="input-group">
              <label htmlFor="gender" className="styled-input-label">
                Gender
              </label>
              <select
                {...register("gender")}
                id="gender"
                className="styled-select"
              >
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="others">Others</option>
              </select>
              {errors.gender && (
                <span className="field-error">{errors.gender.message}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="age" className="styled-input-label">
                Age
              </label>
              <input
                {...register("age", { valueAsNumber: true })}
                id="age"
                type="number"
                min="2"
                max="80"
                className="styled-input"
                placeholder="25"
              />
              {errors.age && (
                <span className="field-error">{errors.age.message}</span>
              )}
            </div>
          </div>

          <div className="apply-form-input-group">
            <div className="input-group">
              <label htmlFor="address" className="styled-input-label">
                Residential Address
              </label>
              <input
                {...register("address")}
                id="address"
                type="text"
                className="styled-input"
                placeholder="123 Street Name, City, State"
              />
              {errors.address && (
                <span className="field-error">{errors.address.message}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="instagram" className="styled-input-label">
                Instagram Username
              </label>
              <input
                {...register("instagram")}
                id="instagram"
                type="text"
                className="styled-input"
                placeholder="@username"
              />
              {errors.instagram && (
                <span className="field-error">{errors.instagram.message}</span>
              )}
            </div>
          </div>

          <div className="apply-form-input-group">
            <div className="input-group">
              <label htmlFor="headshot" className="styled-input-label">
                Upload Headshot
              </label>
              <Controller
                name="headshot"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <input
                    {...field}
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    onChange={(e) => onChange(e.target.files?.[0])}
                    className="styled-input"
                  />
                )}
              />
              {errors.headshot && (
                <span className="field-error">{errors.headshot.message}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="rightSideProfile" className="styled-input-label">
                Upload Side Profile (Right View)
              </label>
              <Controller
                name="rightSideProfile"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <input
                    {...field}
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    onChange={(e) => onChange(e.target.files?.[0])}
                    className="styled-input"
                  />
                )}
              />
              {errors.rightSideProfile && (
                <span className="field-error">
                  {errors.rightSideProfile.message}
                </span>
              )}
            </div>
          </div>

          <div className="apply-form-input-group">
            <div className="input-group">
              <label htmlFor="leftSideProfile" className="styled-input-label">
                Upload Side Profile (Left View)
              </label>
              <Controller
                name="leftSideProfile"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <input
                    {...field}
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    onChange={(e) => onChange(e.target.files?.[0])}
                    className="styled-input"
                  />
                )}
              />
              {errors.leftSideProfile && (
                <span className="field-error">
                  {errors.leftSideProfile.message}
                </span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="fullLength" className="styled-input-label">
                Upload Full Length
              </label>
              <Controller
                name="fullLength"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <input
                    {...field}
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    onChange={(e) => onChange(e.target.files?.[0])}
                    className="styled-input"
                  />
                )}
              />
              {errors.fullLength && (
                <span className="field-error">{errors.fullLength.message}</span>
              )}
            </div>
          </div>

          <div className="apply-form-button-container">
            <FormBtn
              label={
                isSubmitting
                  ? "Submitting..."
                  : isCsrfLoading
                    ? "Securing form..."
                    : "Submit"
              }
              disabled={isSubmitting || isCsrfLoading}
            />
          </div>
        </fieldset>

        {submitSuccess && (
          <FormSuccess message="Application submitted successfully!" />
        )}
      </form>
    </div>
  );
};

export default ApplyForm;
