import React from 'react';
import { time2thumbnail } from '../../core/filmstrip/helpers';
import './style/index.scss';
import { Card } from 'antd';
import * as TimeCore from '../../core/time';
import { relative } from 'path';

const generateThumbnails = (label, thumbnail) => {
  const link = time2thumbnail(label, thumbnail.url, thumbnail.sas);
  return <img className="videx-tooltip-thumbnail" src={link} />;
};

export default props => {
  const { active } = props;
  if (active) {
    const { label, thumbnail } = props;
    const value = props.payload === null ? 0 : props.payload[0].value;
    return (
      <Card bordered={true}>
        <div
          style={{
            backgroundColor: '#fff',
            color: '#000',
            height: 100,
            fontWeight: 'bold',
            position: 'relative'
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 0,
              zIndex: 10,
              color: '#fff',
              backgroundColor: '#000'
            }}
          >
            {TimeCore.time2string(label + 1)}
          </span>
          {generateThumbnails(label, thumbnail)}
          <p>
            {props.name} : {value}{' '}
          </p>
        </div>
      </Card>
    );
  }
  return null;
};
