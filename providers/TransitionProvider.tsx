"use client";

import { useRef, useEffect } from "react";
import { TransitionRouter } from "next-transition-router";
import gsap from "gsap";

type TransitionComplete = () => void;

const rows = 4;
const cols = 16;

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const transitionGridRef = useRef<HTMLDivElement | null>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  const createTransitionGrid = () => {
    if (!transitionGridRef.current) return;
    const container = transitionGridRef.current;
    container.innerHTML = "";
    blocksRef.current = [];

    const blockWidth = window.innerWidth / cols;
    const blockHeight = window.innerHeight / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.className = "transition-block";
        block.style.cssText = `
        width: ${blockWidth + 1}px;
        height: ${blockHeight + 1}px;
        left: ${col * blockWidth}px;
        top: ${row * blockHeight}px;
        transform-origin: ${row % 2 == 0 ? "left" : "right"} center;
        `;
        container.appendChild(block);
        blocksRef.current.push(block);
      }
    }

    gsap.set(blocksRef.current, { scaleX: 0 });
  };

  useEffect(() => {
    createTransitionGrid();
    window.addEventListener("resize", createTransitionGrid);
    return () => window.removeEventListener("resize", createTransitionGrid);
  }, []);

  const getRowBlocks = (row: number) =>
    blocksRef.current.slice(row * cols, row * cols + cols);

  const animateIn = (onComplete: TransitionComplete) => {
    const tl = gsap.timeline({ onComplete });

    [0, 1, 2, 3].forEach((row: number) => {
      const blocks = getRowBlocks(row);

      tl.to(
        blocks,
        {
          scaleX: 1,
          duration: 0.75,
          ease: "power3.inOut",
          stagger: {
            each: 0.025,
            from: row % 2 == 0 ? "start" : "end",
          },
        },
        "<",
      );
    });

    return tl;
  };

  const animateOut = (onComplete: TransitionComplete) => {
    const tl = gsap.timeline({ onComplete });

    [0, 1, 2, 3].forEach((row: number) => {
      const blocks = getRowBlocks(row);

      tl.to(
        blocks,
        {
          scaleX: 0,
          duration: 0.75,
          ease: "power3.inOut",
          stagger: {
            each: 0.025,
            from: row % 2 == 0 ? "start" : "end",
          },
        },
        "<",
      );
    });

    return tl;
  };

  console.log('active')

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        const tl = animateIn(next);
        return () => tl.kill();
      }}
      enter={(next) => {
        const tl = animateOut(next);
        return () => tl.kill();
      }}
    >
      <div className="transition-grid" ref={transitionGridRef} />
      {children}
    </TransitionRouter>
  );
}
