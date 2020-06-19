import { Input } from 'antd';
import React from 'react';

export default props => (
  <Input
    style={{
      width: '50vw'
    }}
    placeholder="Access Token"
    value={props.token}
    onChange={event => props.onChange(event.target.value)}
  />
);
