import React from 'react';
import { CirclePicker } from 'react-color';

interface ColorPickerProps {
  onChangeComplete: (color: string) => void;
}

export default (props: ColorPickerProps) => (
  <div>
    <CirclePicker
      onChangeComplete={color => props.onChangeComplete(color.hex)}
      width="187px"
      colors={['#e32990', '#fff110', '#4cba35', '#28a3dc', '#9719ff']}
      circleSize={20}
    />
  </div>
);
