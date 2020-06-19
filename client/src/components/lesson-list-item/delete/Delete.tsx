import { Icon, Popconfirm } from 'antd';
import React from 'react';

export default ({ onDeleteCancel, onDeleteConfirm, onDelete }) => (
  <Popconfirm
    title="Are you sure you wish to unlink this lesson?"
    onCancel={onDeleteCancel}
    onConfirm={onDeleteConfirm}
    okText="Delete Lesson"
    cancelText="Cancel"
  >
    <div onClick={onDelete}>
      <Icon type="delete" />
      <br />
      <span style={{ fontSize: 'small' }}>Delete</span>
    </div>
  </Popconfirm>
);
