import React from 'react';
import { defaultStyle, checkStyle } from './style';
import { View } from 'react-native';

const anyToString = n => `${n}`;
const pointToArray = p => [`${p.x}`, `${p.y}`];

const createImageFilter = (ImageFilter) => ({ style, children, ...restProps }) => {
  checkStyle(style);

  const {
    inputRadius,
    inputWidth,
    inputAmount,
    inputCenter,
    inputPoint0,
    inputPoint1,
    ...restInputs
  } = restProps;

  const props = {
    ...(inputRadius ? { inputRadius: anyToString(inputRadius) } : {}),
    ...(inputWidth ? { inputWidth: anyToString(inputWidth) } : {}),
    ...(inputAmount ? { inputAmount: anyToString(inputAmount) } : {}),
    ...(inputCenter ? { inputCenter: pointToArray(inputCenter) } : {}),
    ...(inputPoint0 ? { inputPoint0: pointToArray(inputPoint0) } : {}),
    ...(inputPoint1 ? { inputPoint1: pointToArray(inputPoint1) } : {}),
    ...restInputs
  };

  return (
    <ImageFilter
      style={[defaultStyle.container, style]}
      {...props}
    >
      {children}
    </ImageFilter>
  );
};

module.exports = createImageFilter;