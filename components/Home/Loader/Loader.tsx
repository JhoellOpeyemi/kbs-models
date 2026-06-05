"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { brandTokens } from "@/lib/designTokens";

import { ease1, ease2 } from "@/utils";
import "./loader.css";

const loaderImages = [
  "/assets/loader/loader-4.jpg",
  "/assets/loader/loader-3.jpg",
  "/assets/loader/loader-2.jpg",
  "/assets/loader/loader-1.jpg",
];

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  console.log(isLoading);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const wrapperElements = Array.from(
      loaderRef.current?.querySelectorAll<HTMLElement>(
        ".loader-image-wrapper",
      ) ?? [],
    );
    const loaderContainer = loaderRef.current;
    const loaderText = loaderRef.current?.querySelector<HTMLElement>(
      ".loader-text-content",
    );

    if (!wrapperElements.length || !loaderContainer || !loaderText) {
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }

    const timeline = gsap.timeline();

    timeline
      .fromTo(
        wrapperElements,
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.2,
          ease: ease2,
          stagger: {
            each: 2.5,
          },
        },
      )
      .to(
        wrapperElements,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.2,
          ease: ease2,
          onComplete: () => {
            setIsLoading(false);
          },
        },
        "+=1.5",
      )
      .to(
        loaderContainer,
        {
          opacity: 0,
          duration: 0.8,
          ease: ease1,
        },
        "+=1",
      )
      .to(loaderContainer, {
        visibility: "hidden",
      });

    return () => {
      timeline.kill();
      document.body.style.overflow = originalOverflow;
    };
  }, []);

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
