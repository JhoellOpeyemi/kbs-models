"use client";

// libraries imports
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// context imports
import { useModelsContext } from "@/contexts/ModelsProvider";
import { useAnimationContext } from "@/contexts/AnimationProvider";

// components imports
import ModelCard from "@/components/ModelsComponents/Models/ModelCard/ModelCard";
import SplitText from "@/components/utils/SplitText";
import { Error } from "@/components/Errors/Error";
import { Loading } from "@/components/Loading/Loading";

// animation imports
import { createRevealModelNameTimeline } from "./animation";

// styles import
import "./models.css";

// functions imports
import { horizontalScroll } from "@/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Models = () => {
  const { filteredModels, isLoading, error } = useModelsContext();
  const containerRef = useAnimationContext();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [refsReady, setRefsReady] = useState<boolean>(false);
  const [modelName, setModelName] = useState<string>("");
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleModelMouseLeave = () => {
    if (timelineRef.current) {
      timelineRef.current.reverse();
    } else {
      setModelName("");
    }
    setActiveIndex(null);
  };

  const handleModelHover = (index: number) => {
    setActiveIndex(index);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 992px)", () => {
        const horizontalScrollTrigger = horizontalScroll(
          containerRef,
          scrollContainerRef,
        );

        return horizontalScrollTrigger?.kill;
      });

      return () => mm.revert();
    },
    { dependencies: [refsReady] },
  );

  useEffect(() => {
    if (containerRef.current && scrollContainerRef.current) {
      setRefsReady(true);
    }
  });

  useEffect(() => {
    if (modelName) {
      // delay to ensure DOM is updated before animation
      setTimeout(() => {
        if (timelineRef.current) {
          timelineRef.current.kill();
          timelineRef.current = null;
        }

        timelineRef.current = createRevealModelNameTimeline();
        // when reversed fully, clear the name
        timelineRef.current.eventCallback("onReverseComplete", () =>
          setModelName(""),
        );
        timelineRef.current.play(0);
      }, 0);
    }
  }, [modelName]);

  if (isLoading) return <Loading label="Models" />;
  if (error) return <Error label="Models" />;

  return (
    <>
      <section className="models-section-container">
        <p aria-label="hidden" className="models-section-info">
          &lt;&lt; Swipe to view more &gt;&gt;
        </p>
        <ul className="models-list-container">
          <div className="model-card-wrapper" ref={scrollContainerRef}>
            {filteredModels && filteredModels.length > 0 ? (
              filteredModels.map((model, index) => (
                <ModelCard
                  key={index}
                  index={index}
                  model={model}
                  setModelName={setModelName}
                  onMouseLeave={handleModelMouseLeave}
                  onHover={handleModelHover}
                  isActive={activeIndex === index}
                />
              ))
            ) : (
              <p>No models to display.</p>
            )}
          </div>
        </ul>
      </section>

      <h3 className="model-name-preview">
        <SplitText text={modelName} splitType="words, chars" />
      </h3>
    </>
  );
};

export default Models;
