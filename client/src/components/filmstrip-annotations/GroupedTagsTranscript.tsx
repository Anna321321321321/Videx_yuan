import { Popover } from 'antd';
import React, { Component } from 'react';
import {
  Icon,
  Label,
  List,
  SemanticCOLORS,
  SemanticICONS
} from 'semantic-ui-react';

interface GroupedTagsTranscriptProps {
  onDeleteTag: (id: string) => void;
  onSelectTag: (id: string) => void;
  onDeselectTag: () => void;
  tags: {
    loading: boolean;
    color: string;
    icon: string;
    text: string;
    id: string;
  }[];
}

export default class GroupedTagsTranscript extends Component<
  GroupedTagsTranscriptProps,
  any
> {
  render() {
    return (
      <Popover
        content={
          <List>
            {this.props.tags.map((tag, index) => (
              <List.Item
                key={index}
                onMouseEnter={() => this.props.onSelectTag(tag.id)}
                onMouseLeave={() => this.props.onDeselectTag()}
              >
                <Label color={tag.color as SemanticCOLORS}>
                  <Icon name={tag.icon as SemanticICONS} />
                  {tag.text}
                  <Icon
                    name="delete"
                    loading={tag.loading}
                    disabled={tag.loading}
                    onClick={() => this.props.onDeleteTag(tag.id)}
                  />
                </Label>
              </List.Item>
            ))}
          </List>
        }
      >
        <Icon
          loading={true}
          color="teal"
          name="tags"
          style={{
            marginRight: '0px'
          }}
        />
      </Popover>
    );
  }
}
