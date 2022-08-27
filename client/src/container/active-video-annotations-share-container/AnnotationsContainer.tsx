import React, { Fragment } from 'react';
import { Button, Drawer } from 'antd';
import _ from 'lodash';
import { AnnotationManagerSegment } from '../../components/annotation-manager';
import { compose, withState, onlyUpdateForKeys } from 'recompose';
import * as Logger from 'videx/client/logger';
import ExportContainer from '../export-container';
import ShareAnnotationContainer from '../share-annotation-container';
import DoneButtonContainer from '../done-button-annotation-manager-container';
// Look through this for front end AM

interface AnnotationsContainerProps {
  setVisible: (value: boolean) => void;
  visible: boolean;
  annotations: [];
  thumbnail: {
    url: string;
    sas: string;
    height: number;
    width: number;
  };
  pauseVideo: () => void;
}

const enhance = compose(
  withState('visible', 'setVisible', false),
  onlyUpdateForKeys([
    'annotations',
    'transcripts',
    'annotations',
    'thumbnail',
    'visible',
  ])
);

export default enhance((props: AnnotationsContainerProps) => {
  let annotation = [];
  if (props.annotations !== undefined) {
    annotation = props.annotations.map((item, id) => {
      //@ts-ignore
      return item.toObject();
    });
    annotation = _.sortBy(annotation, 'end');
  }
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
    // if(e.target.checked){
    //   mongodb.(true);
    // }
    // else
    //   mongodb.();
  }
  return (
    <Fragment>
      <div>
        <Button
          type="primary"
          onClick={() => {
            props.setVisible(true);
            props.pauseVideo();
            Logger.event('Annotation.Manager.Open');
          }}
        >
          Annotations
        </Button>

        <Drawer
          title={
            <span>
              <table>
                <tr>
                    <td>
                        Annotations Manager
                    </td>
                    <td width="30"></td>
                    <td>
                        <ExportContainer />
                    </td>
               </tr>
              </table>
            </span>
          }
          placement="top"
          closable={true}
          onClose={() => {
            Logger.event('Annotation.Manager.Close');
            props.setVisible(false);
          }}
          visible={props.visible}
          height={'auto'}
          style={{
            overflow: 'auto',
            overflowY: 'auto',
            height: '80vh',
          }}
        >
          <div className="videx-vertical-scroll">
            {annotation.map((item, idx) => (
              <AnnotationManagerSegment
                annotation={item}
                thumbnail={props.thumbnail}
                idx={idx}
                visible={props.visible}
              />
            ))}
          </div>
        </Drawer>
      </div>
    </Fragment>
  );
});