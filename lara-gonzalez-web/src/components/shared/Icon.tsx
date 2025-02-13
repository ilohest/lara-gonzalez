import React from 'react';
import './Icon.scss';


interface Props {
  classes?: string;
}

const Icon = ({url, classes} : {url: string, classes?: string}) => {

  const iconMask = {
    mask: `url(${url}) no-repeat center / contain`,
    WebkitMask: `url(${url}) no-repeat center / contain`,
  };

  const className = `icon ${classes ?? ''}`;

  return (
    <span className={className} style={iconMask}></span>
  )
}

export default Icon

