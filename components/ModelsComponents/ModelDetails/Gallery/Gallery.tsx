import { urlFor } from "@/sanity/lib/image";
import { Model } from "@/sanity/types";
// components import
import MediaCard from "@/components/utils/MediaCard/MediaCard";

import "./gallery.css";

const Gallery = ({ images }: { images?: Model["gallery"] }) => {
  const safeImages = images ?? [];

  return (
    <section className="gallery-section-container">
      <div className="gallery-media-container">
        {safeImages.map((image, index: number) => {
          const imageUrl =
            typeof image === "string"
              ? image
              : // use sanity url builder for image objects
                urlFor(image).width(500).auto("format").quality(75).url();

          return <MediaCard image={imageUrl} key={index} />;
        })}
      </div>
    </section>
  );
};

export default Gallery;
