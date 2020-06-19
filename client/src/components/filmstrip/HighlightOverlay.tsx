import React, { Fragment } from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { Popover } from 'antd';
import AnnotationEditContainer from '../../container/annotation-edit-container';
import * as Logger from 'videx/client/logger';

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
            width={highlight.width}
            height={10}
            fill={
              highlight.annotation.text === null
                ? '#ffffff'
                : highlight.annotation.color
            }
            stroke={highlight.annotation.color}
            strokeWidth={3}
            onMouseLeave={() =>
              Logger.event('Annotation.Hover', {
                source: 'filmstrip',
                annotationId: highlight.annotation.id,
                annotationColor: highlight.annotation.color,
                annotationText: highlight.annotation.text,
                annotationStart: highlight.annotation.start,
                annotationEnd: highlight.annotation.end,
                annotationTranscript: highlight.annotation.transcript
              })
            }
          />
        </Popover>
      ))}
    </svg>
  );
});
