import { Popover } from 'antd';
import React, { Component } from 'react';
import { Icon, Label, SemanticCOLORS, SemanticICONS } from 'semantic-ui-react';

interface TagFilmstripProps {
  onDeleteTag: (id: string) => void;
  onSelectTag: (id: string) => void;
  onDeselectTag: () => void;
  id: string;
  loading: boolean;
  color: string;
  icon: string;
  text: string;
  position: number;
}

export default class TagFilmstrip extends Component<TagFilmstripProps, any> {
  render() {
    const {
      color,
      icon,
      text,
      loading,
      position,
      onDeleteTag,
      id
    } = this.props;
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
              onClick={e => {
                onDeleteTag(id);
                e.stopPropagation();
              }}
            />
          </Label>
        }
      >
        <Icon
          bordered={true}
          inverted={true}
          size="small"
          name={icon as SemanticICONS}
          color={color as SemanticCOLORS}
          style={{
            position: 'absolute',
            left: position
          }}
          onMouseEnter={() => this.props.onSelectTag(id)}
          onMouseLeave={() => this.props.onDeselectTag()}
        />
      </Popover>
    );
  }
}
