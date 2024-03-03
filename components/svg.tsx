import React from 'react';
import { SvgXml } from 'react-native-svg';

const SvgComponent = ({ svgString }: { svgString: string }) => {
  return (
    <SvgXml xml={svgString} width="100%" height="100%" />
  );
};

export default SvgComponent;
