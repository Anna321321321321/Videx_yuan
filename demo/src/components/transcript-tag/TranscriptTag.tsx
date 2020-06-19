import React from 'react';
import { Icon, Label } from 'semantic-ui-react';

export default ({
  color,
  text,
  onMouseEnter,
  onMouseLeave,
  loading,
  onDeleteTag
}) => (
  <Label
    style={{
      cursor: 'pointer'
    }}
    color={color}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {text}
    <Icon name="delete" disabled={loading} onClick={onDeleteTag} />
  </Label>
);
