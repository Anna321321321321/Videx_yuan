import React from 'react';
import { Button } from 'antd';

interface OpenVideoButtonProps {
  courseId: string;
  lessonId: string;
  start: number;
  end: number;
}

export default (props: OpenVideoButtonProps) => (
  <Button
    style={{ borderRadius: 0, float: 'right', marginTop: 3 }}
    type="primary"
    onClick={() =>
      window.open(
        `/course/${props.courseId}/lesson/${props.lessonId}?start=${
          props.start
        }&end=${props.end}`
      )
    }
  >
    Open Video
  </Button>
);
