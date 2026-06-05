import Image from "next/image";

import "./mediaCard.css";

const MediaCard = ({ image }: { image: string }) => {
  return (
    <div className="media-card-image-container">
      <Image
        src={image}
        alt=""
        className="media-card-image"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        fill
        priority
        unoptimized
      />
    </div>
  );
};

export default MediaCard;
