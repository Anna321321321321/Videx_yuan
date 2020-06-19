import React from 'react';
import Display from './Display';

interface DisplayProps {
  height: number;
  width: number;
  mode: 'personal' | 'class';
  userViews: {
    max: number;
    data: { count: number }[];
  };
}

export default (props: DisplayProps) => (
  <Display
    color={'#ffc658'}
    height={props.height}
    width={props.width}
    input={props.userViews}
  />
);
