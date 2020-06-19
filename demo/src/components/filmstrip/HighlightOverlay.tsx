import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { Popover } from 'antd';
import AnnotationEditContainer from '../../container/annotation-edit-container';

const enhance = compose(onlyUpdateForKeys(['height', 'width', 'highlights']));

interface HighlightOverlayProps {
  height: number;
  width: number;
  highlights: {
    key: string;
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    metadata: {
      start: number;
      end: number;
    };
    annotation: any;
  }[];
  deleteAnnotation: (id: string) => void;
}

export default enhance((props: HighlightOverlayProps) => {
  return (
    <svg className="videx-highlights" width={props.width} height={15}>
      {props.highlights.map((highlight, idx) => (
        <Popover
          key={idx}
          content={
            <AnnotationEditContainer
              id={highlight.annotation.id}
              origin={'icon'}
              onClickHandle={null}
            />
          }
          placement={'topLeft'}
        >
          <rect
            key={highlight.key}
            x={highlight.x}
            y={highlight.y * 4}
            width={highlight.annotation.text === null ? highlight.width : 12}
            height={10}
            rx={highlight.annotation.text === null ? 0 : 50}
            ry={highlight.annotation.text === null ? 0 : 20}
            fill={highlight.annotation.color}
            stroke={highlight.annotation.color}
            strokeWidth={1}
          />
        </Popover>
      ))}
    </svg>
  );
});
