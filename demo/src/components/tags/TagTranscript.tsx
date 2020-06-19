import { Popover } from 'antd';
import React, { Component } from 'react';
import { Icon, Label, SemanticCOLORS, SemanticICONS } from 'semantic-ui-react';

interface TagTranscriptProps {
  id: string;
  loading: boolean;
  color: string;
  icon: string;
  text: string;
  onDeleteTag: (id: string) => void;
  onSelectTag: (id: string) => void;
  onDeselectTag: () => void;
}

export default class TagTranscript extends Component<TagTranscriptProps, any> {
  render() {
    const { color, icon, text, loading, onDeleteTag, id } = this.props;
    return (
      <Popover
        content={
          <Label color={color as SemanticCOLORS}>
            <Icon name={icon as SemanticICONS} />
            {text}
            <Icon
              name="delete"
              loading={loading}
              disabled={loading}
              onClick={() => onDeleteTag(id)}
            />
          </Label>
        }
      >
        <Icon
          name={icon as SemanticICONS}
          color={color as SemanticCOLORS}
          onMouseEnter={() => this.props.onSelectTag(id)}
          onMouseLeave={() => this.props.onDeselectTag()}
          style={{
            marginRight: '0px'
          }}
        />
      </Popover>
    );
  }
}
