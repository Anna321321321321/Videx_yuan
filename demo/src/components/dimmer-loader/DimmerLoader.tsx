import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export interface DimmerLoaderProps {
  active: boolean;
}

export default (props: DimmerLoaderProps) => (
  <Dimmer active={props.active}>
    <Loader>Loading</Loader>
  </Dimmer>
);
