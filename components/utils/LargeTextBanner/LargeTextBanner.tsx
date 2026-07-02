"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./largeTextBanner.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LargeTextBanner = ({ texts }: { texts: string }) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const textArray = texts.split(" ");

  useGSAP(
    () => {
      gsap.to(".text-banner-container span", {
        opacity: 1,
        stagger: 0.25,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
          end: "top 30%",
          scrub: true,
        },
      });
    },
    { scope: textRef },
  );

  return (
    <div ref={textRef}>
      <h3 className="text-banner-container">
        {textArray.map((text, index) => (
          <span key={index}>{text}&nbsp;</span>
        ))}
      </h3>
    </div>
  );
};

export default LargeTextBanner;
