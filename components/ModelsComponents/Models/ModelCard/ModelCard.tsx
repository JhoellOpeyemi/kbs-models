"use client";

import Link from "next/link";
import Image from "next/image";
import { Model } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { formatIndex } from "@/utils";

import "./modelCard.css";

interface ModelCardProps {
  model: Model;
  index: number;
  setModelName?: React.Dispatch<React.SetStateAction<string>>;
  onMouseLeave?: () => void;
  onHover?: (index: number) => void;
  isActive?: boolean;
}

const ModelCard = ({
  model,
  index,
  setModelName,
  onMouseLeave,
  onHover,
  isActive,
}: ModelCardProps) => {
  const handleModelHover = () => {
    // this updates the modelName state in Models.tsx when you hover a model card
    if (setModelName) {
      setModelName(model?.name || "");
    }
    if (onHover) onHover(index);
  };

  return (
    <>
      <li className={`model-card-container ${isActive ? "active" : ""}`}>
        <p className="model-index">{formatIndex(index)}</p>

        <Link
          href={`/models/${model.slug}`}
          className="model-card-link"
          aria-label={`View ${model.name}'s profile`}
          onMouseEnter={handleModelHover}
          onMouseLeave={() => {
            if (onMouseLeave) onMouseLeave();
          }}
        >
          <div className="model-card-image-container">
            {model.headshot && (
              <Image
                src={urlFor(model.headshot)
                  .width(220)
                  .auto("format")
                  .quality(75)
                  .url()}
                alt={`${model.name} headshot`}
                className="model-card-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                priority
                unoptimized
              />
            )}
          </div>
        </Link>

        <h3 className="mobile-model-name">{model.name}</h3>
      </li>
    </>
  );
};

export default ModelCard;
