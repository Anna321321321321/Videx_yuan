import { Button, Input, message } from 'antd';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as Logger from 'videx/client/logger';

export default ({ text }) => (
  <div>
    <Input disabled={true} value={text} />
    <CopyToClipboard text={text} onCopy={() => message.success('Copied')}>
      <Button
        className="videx-copy-text-button"
        icon="copy"
        onClick={() => Logger.event('Copy.Link')}
      />
    </CopyToClipboard>
  </div>
);
