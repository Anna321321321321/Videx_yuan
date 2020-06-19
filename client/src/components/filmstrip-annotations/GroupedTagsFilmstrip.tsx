import { Popover } from 'antd';
import React, { Component } from 'react';
import {
  Icon,
  Label,
  List,
  SemanticCOLORS,
  SemanticICONS
} from 'semantic-ui-react';

interface GroupedTagsProps {
  position: number;
  onDeleteTag: (id: string) => void;
  onSelectTag: (id: string) => void;
  onDeselectTag: () => void;
  annotations: {
    text: string;
    color: string;
    id: string;
    bookmark: boolean;
  }[];
}

export default class GroupedTagsFilmstrip extends Component<
  GroupedTagsProps,
  any
> {
  render() {
    const { position } = this.props;
    return (
      <Popover
        content={
          <List>
            {this.props.annotations.map((tag, index) => (
              <List.Item key={index}>
                <Label color={tag.color as SemanticCOLORS}>
                  <Icon name={'bookmark'} />
                  {tag.text}
                </Label>
              </List.Item>
            ))}
          </List>
        }
      >
        <Icon
          bordered={true}
          inverted={true}
          size="small"
          color="teal"
          name="tags"
          style={{
            position: 'absolute',
            left: position
          }}
        />
      </Popover>
    );
  }
}
