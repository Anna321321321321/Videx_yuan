import { Tooltip } from 'antd';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import {
  Icon,
  Label,
  SemanticCOLORS,
  SemanticICONS,
  List
} from 'semantic-ui-react';

interface AnnotationDisplayPluginTagsProps {
  tags: {
    color: string;
    icon: string;
    text: string;
    start: number;
  }[];
}

export default class AnnotationDisplayPluginTags extends PureComponent<
  AnnotationDisplayPluginTagsProps,
  null
> {
  render() {
    const position =
      this.props.tags.reduce((aggregator, tag) => aggregator + tag.start, 0) /
      this.props.tags.length;
    return (
      <Tooltip
        title={
          <List>
            {this.props.tags.map((tag, index) => (
              <List.Item key={index}>
                <Label color={tag.color as SemanticCOLORS}>
                  <Icon name={tag.icon as SemanticICONS} />
                  {tag.text}
                </Label>
              </List.Item>
            ))}
          </List>
        }
        getPopupContainer={() => ReactDOM.findDOMNode(this)}
      >
        <div
          className="videx-annotations-display-plugin-tags"
          style={{
            left: `${position * 100}%`,
            background: 'green',
            top: '1px'
          }}
        />
      </Tooltip>
    );
  }
}
