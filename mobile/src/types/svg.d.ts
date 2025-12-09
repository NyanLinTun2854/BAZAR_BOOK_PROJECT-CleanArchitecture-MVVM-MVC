// src/types/svg.d.ts

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';

  // Define the SVG module as a React functional component
  const content: React.FC<SvgProps>;
  export default content;
}
