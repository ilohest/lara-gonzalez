import React from "react";

const ImageWrapper = ({ image }: { image: any }) => {
    return (
      <picture className="image-wrapper">
        <img src={image.url} alt={image.alt} width={image.width} height={image.height} loading="lazy"/>
      </picture>
    );
  };
  
  export default ImageWrapper;
  