import React, { Fragment } from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { Tag } from 'antd';

const enhance = compose(
  onlyUpdateForKeys(['annotationText', 'annotationColor'])
);

export default enhance((props: any) => {
  const noteTextArray: string[] = props.annotationText.split(/\s/);

  const re = new RegExp('#\\w+');
  const tags = noteTextArray.filter(item => re.exec(item) !== null);

  return (
    <Fragment>
      {tags.length !== 0 && (
        <span>
          {tags.map(item => (
            <div>
              <Tag
                color={
                  props.annotationColor === null ? null : props.annotationColor
                }
                style={{
                  color:
                    props.annotationColor === '#fff110' ||
                    props.annotationColor === null
                      ? 'black'
                      : 'white',
                  borderRadius: 0
                }}
              >
                {item}
              </Tag>
            </div>
          ))}
        </span>
      )}
    </Fragment>
  );
});
