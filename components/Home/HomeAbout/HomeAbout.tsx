"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./homeAbout.css";
import Brands from "@/components/Home/Brands/Brands";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HomeAbout = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(".home-about-text span", {
        opacity: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".home-about-text",
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section className="home-about-section" ref={sectionRef}>
      <h3 className="home-about-text">
        <span>Nigeria's&nbsp;</span>
        <span>first&nbsp;</span>
        <span>dedicated&nbsp;</span>
        <span>face&nbsp;</span>
        <span>modelling&nbsp;</span>
        <span>agency</span>
      </h3>

      <Brands />
    </section>
  );
};

export default HomeAbout;
