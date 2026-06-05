"use client";

import { useState } from "react";
import { useModelDetails } from "@/sanity/lib/hooks";
// components import
import Gallery from "@/components/ModelsComponents/ModelDetails/Gallery/Gallery";
import BookingForm from "@/components/utils/BookingForm/BookingForm";
import StyledLink from "@/components/utils/StyledLink/StyledLink";

import "./modelDetails.css";

const ModelDetails = ({ slug }: { slug: string }) => {
  const { data: model, isLoading, error } = useModelDetails(slug);
  const [isBookingModal, setIsBookingModal] = useState<boolean>(false);

  const firstNameOfModel = model?.name?.split(" ")[0];

  if (isLoading) return <p>Loading Models...</p>;
  if (error) return <p>Error loading models: {error.message}</p>;

  return (
    <section className="model-details-section-container">
      <div className="model-details-section">
        <div className="model-details-content-container">
          <div className="back-to-models-link">
            <StyledLink path="/models" label="Back to Models" />
          </div>

          <div className="model-details-content">
            <h1 className="model-name">{model?.name}</h1>

            {/* <div className="model-stats-container">
              <p className="model-stat">
                <span className="stat-heading">Skin Tone — </span>
                <span className="stat-value">{model?.skin_tone}</span>
              </p>
              <p className="model-stat">
                <span className="stat-heading">Skin Type — </span>
                <span className="stat-value">{model?.skin_type}</span>
              </p>
              <p className="model-stat">
                <span className="stat-heading">Face Shape — </span>
                <span className="stat-value">{model?.face_shape}</span>
              </p>
              <p className="model-stat">
                <span className="stat-heading">Eye Color — </span>
                <span className="stat-value">{model?.eye_color}</span>
              </p>
              <p className="model-stat">
                <span className="stat-heading">Hair — </span>
                <span className="stat-value">{model?.hair}</span>
              </p>
              <p className="model-stat">
                <span className="stat-heading">Lip Size — </span>
                <span className="stat-value">{model?.lip_size}</span>
              </p>
            </div> */}

            <div className="tab-book-model-btn-container">
              <button
                className={`${isBookingModal ? "link book-model-btn disabled" : "book-model-btn"}`}
                onClick={() => setIsBookingModal(true)}
              >
                (Book {firstNameOfModel})
              </button>
            </div>
          </div>
        </div>

        <Gallery images={model?.gallery} />

        <div className="book-model-btn-container">
          <button
            className={`${isBookingModal ? "link book-model-btn disabled" : "book-model-btn"}`}
            onClick={() => setIsBookingModal(true)}
          >
            (Book {firstNameOfModel})
          </button>
        </div>
      </div>

      {isBookingModal && (
        <BookingForm
          closeBookingModal={() => setIsBookingModal(false)}
          modelName={model?.name}
        />
      )}
    </section>
  );
};

export default ModelDetails;
