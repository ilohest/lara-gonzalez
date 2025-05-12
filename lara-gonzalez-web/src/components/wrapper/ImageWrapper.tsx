import React from "react";
import Picture from "src/atoms/Picture";

const ImageWrapper = ({ image }: { image: any }) => {
    return (
      <>
        <Picture
          className="image-wrapper"
          fetchPriority="low"
          blurPreload={true}
          src={image.url}
          alt={image.alt}
        />
      </>
    );
  };
  
  export default ImageWrapper;
  