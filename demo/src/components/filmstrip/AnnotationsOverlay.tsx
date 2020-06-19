import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { FilmstripAnnotation } from '../filmstrip-annotations';

const enhance = compose(onlyUpdateForKeys(['annotations']));

interface AnnotationsOverlayProps {
  annotations: {
    position: number;
    annotations: any;
  }[];
  deleteAnnotation: (id: string) => void;
}

export default enhance((props: AnnotationsOverlayProps) => {
  return (
    <div className="videx-annotations">
      {props.annotations.map((annotation, index) => {
        if (annotation.annotations.length === 1) {
          return (
            <FilmstripAnnotation
              key={index}
              annotation={annotation.annotations[0]}
              position={annotation.position}
              deleteAnnotation={props.deleteAnnotation}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
});
