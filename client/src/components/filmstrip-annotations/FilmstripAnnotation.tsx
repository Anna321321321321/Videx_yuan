import React from 'react';
import { compose } from 'recompose';
import { Icon } from 'semantic-ui-react';

interface FilmstripAnnotationProps {
  position: number;
  deleteAnnotation: (id: string) => void;
  annotation: any;
}

export default compose((props: FilmstripAnnotationProps) => {
  const { text, share, color } = props.annotation;
  return (
    <Icon
      bordered={true}
      size="small"
      name={
        share
          ? 'share alternate square'
          : text === null
            ? 'sticky note outline'
            : 'sticky note'
      }
      style={{
        position: 'absolute',
        left: props.position,
        backgroundColor: color === null ? 'grey' : color,
        color: color === '#fff110' ? 'grey' : 'white'
      }}
    />
  );
});
