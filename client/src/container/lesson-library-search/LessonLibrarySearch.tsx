import { Input } from 'antd';
import React from 'react';

export default ({ onChange, onSearch }) => (
  <Input.Search
    placeholder="Search Lessons"
    onSearch={onSearch}
    enterButton={true}
  />
);
