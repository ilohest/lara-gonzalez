import React from "react";

const ImageWrapper = ({ image }: { image: any }) => {
    return (
      <div className="image-wrapper">
        <img src={image.url} alt={image.alt} width={image.width} height={image.height} />
      </div>
    );
  };
  
  export default ImageWrapper;
  