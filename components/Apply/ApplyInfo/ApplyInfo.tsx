import Image from "next/image";

import "./applyInfo.css";

const ApplyInfo = () => {
  return (
    <section className="apply-info-container">
      <div className="apply-info-text-container">
        <h3 className="apply-info-heading">
          Application Notes — Please Read First
        </h3>

        <div className="polaroids-info-container">
          <h4 className="polaroids-info-heading">
            Important notes in taking polaroids:
          </h4>

          <ul className="polaroids-info-list-container">
            <li className="polaroids-info-list">
              Do not wear any makeup whatsoever.
            </li>
            <li className="polaroids-info-list">
              Put your hair up, or pull it back into a ponytail so that your
              jawline and cheekbones are well depicted.
            </li>
            <li className="polaroids-info-list">
              Do not retouch the images in any way. Blemishes are fine.
            </li>
            <li className="polaroids-info-list">
              Please make sure uploaded images are less than 5MB.
            </li>
          </ul>
        </div>

        <div className="picture-guideline-container">
          <h4 className="picture-guideline-heading">
            How to take the pictures
          </h4>

          <ul className="picture-guideline-list-container">
            <li className="picture-guideline-list">
              To take these pictures, any clear camera or phone camera will
              work.
            </li>
            <li className="picture-guideline-list">
              Take the pictures outdoors in natural light without flash, if
              possible.
            </li>
            <li className="picture-guideline-list">
              Keep the background simple, for example, a simple wall, ideally
              white.
            </li>
          </ul>
        </div>
      </div>

      <div className="apply-info-images-container">
        <div className="apply-info-image-container">
          <Image
            src="/brands-img.webp"
            alt=""
            fill
            className="apply-info-image"
          />
        </div>
        <div className="apply-info-image-container">
          <Image
            src="/brands-img.webp"
            alt=""
            fill
            className="apply-info-image"
          />
        </div>
        <div className="apply-info-image-container">
          <Image
            src="/brands-img.webp"
            alt=""
            fill
            className="apply-info-image"
          />
        </div>
        <div className="apply-info-image-container">
          <Image
            src="/brands-img.webp"
            alt=""
            fill
            className="apply-info-image"
          />
        </div>
      </div>
    </section>
  );
};

export default ApplyInfo;
