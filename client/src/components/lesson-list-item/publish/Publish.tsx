import { Icon, Tooltip } from 'antd';
import React from 'react';

export default ({ publish, onClick }) => {
  if (publish) {
    return (
      <div onClick={() => onClick(false)}>
        <Tooltip
          title="Unpublish this lesson to disable student access."
          placement="right"
        >
          <Icon type="lock" />
          <br />
          <span style={{ fontSize: 'small' }}>Unpublish</span>
        </Tooltip>
      </div>
    );
  } else {
    return (
      <div onClick={() => onClick(true)}>
        <Tooltip
          title="Publish this lesson to enable student access."
          placement="right"
        >
          <Icon type="unlock" />
          <br />
          <span style={{ fontSize: 'small' }}>Publish</span>
        </Tooltip>
      </div>
    );
  }
};
