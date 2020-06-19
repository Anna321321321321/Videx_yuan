import React from 'react';
import Display from './Display';
import DisplayBranchHOC from './DisplayBranchHOC';

interface DisplayProps {
  height: number;
  width: number;
  mode: 'personal' | 'class';
  userViews: {
    max: number;
    data: { count: number }[];
  };
  aggregatedViews: {
    max: number;
    data: { count: number }[];
  };
}

const PersonalDisplay = (props: DisplayProps) => (
  <Display
    color={'#ffc658'}
    height={props.height}
    width={props.width}
    input={props.userViews}
  />
);

const ClassDisplay = (props: DisplayProps) => (
  <Display
    color={'#8884d8'}
    height={props.height}
    width={props.width}
    input={props.aggregatedViews}
  />
);

export default DisplayBranchHOC(PersonalDisplay, ClassDisplay)();
