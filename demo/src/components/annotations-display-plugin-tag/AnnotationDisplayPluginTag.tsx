import { Tooltip } from 'antd';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Label, SemanticCOLORS, SemanticICONS } from 'semantic-ui-react';

interface AnnotationDisplayPluginTagProps {
  color: string;
  icon: string;
  text: string;
  start: number;
}

export default class AnnotationDisplayPluginTag extends PureComponent<
  AnnotationDisplayPluginTagProps,
  null
> {
  render() {
    const { color, start, icon, text } = this.props;
    return (
      <Tooltip
        title={
          <Label color={color as SemanticCOLORS}>
            <Icon name={icon as SemanticICONS} />
            {text}
          </Label>
        }
        getPopupContainer={() => ReactDOM.findDOMNode(this)}
      >
        <div
          className="videx-annotations-display-plugin-tag"
          style={{
            left: `${start * 100}%`,
            background: color,
            top: '1px'
          }}
        />
      </Tooltip>
    );
  }
}
