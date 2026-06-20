"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { brandTokens } from "@/lib/designTokens";

import { ease1 } from "@/utils";
import "./loader.css";

const loaderImages = [
  "/assets/loader/loader-4.webp",
  "/assets/loader/loader-3.webp",
  "/assets/loader/loader-1.webp",
];

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline();

      timeline
        .fromTo(
          ".loader-image-wrapper",
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: ease1,
            stagger: {
              each: 1.75,
            },
          },
        )
        .to(
          ".loader-wrapper",
          {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              setIsLoading(false);
            },
          },
          "+=0.75",
        )
        .to(
          loaderRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: ease1,
          },
          "-=0.25",
        )
        .to(loaderRef.current, {
          visibility: "hidden",
        });

      return () => {
        timeline.kill();
      };
    },
    { scope: loaderRef },
  );

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  return (
    <div className="loader-container" ref={loaderRef}>
      <div className="loader-wrapper">
        <div className="loader-brand-name loader-text-container">
          <p className="loader-brand-name-text">{brandTokens.agencyName}</p>
        </div>

        <div className="loader-images-container">
          {loaderImages.map((src, index) => (
            <div key={index} className="loader-image-wrapper">
              <img
                src={src}
                alt={`Loader ${index + 1}`}
                className="loader-image"
              />
            </div>
          ))}
        </div>

        <div className="loader-text-container">
          <p className="loader-text-content">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
