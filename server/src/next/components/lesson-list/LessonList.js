import React, { Component } from 'react';
import { List, Avatar, Button, Spin, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import EditLesson from '../edit-lesson';

const LessonStatus = {
  Undefined: 0,
  Queued: 1,
  Scheduled: 2,
  Processing: 3,
  Finished: 4,
  Error: 5,
  Canceled: 6,
  Canceling: 7
};

const render = (lesson, onDelete, onEdit) => (
  <List.Item
    key={lesson.id}
    actions={[
      <EditLesson id={lesson.id} onEdit={onEdit} />,
      <Button onClick={() => onDelete(lesson.id)}>Delete</Button>,
      <CopyToClipboard
        text={lesson.token}
        onCopy={() => message.success('Copied')}
      >
        <Button>Get Share Token</Button>
      </CopyToClipboard>
    ]}
  >
    <List.Item.Meta title={lesson.name} description={lesson.summary} />
  </List.Item>
);

export default class LessonList extends Component {
  render() {
    if (this.props.lessons) {
      return (
        <List
          itemLayout="horizontal"
          dataSource={this.props.lessons}
          renderItem={lesson => {
            if (lesson.status === LessonStatus.Finished) {
              return render(lesson, this.props.onDelete, this.props.onEdit);
            } else {
              return <Spin>{render(lesson)}</Spin>;
            }
          }}
        />
      );
    } else {
      return (
        <div
          style={{
            textAlign: 'center',
            margin: 'auto auto'
          }}
        >
          <Spin size={'large'} />
        </div>
      );
    }
  }
}
