import React, { Fragment } from 'react';
import { Button, Drawer } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import { compose, withState, lifecycle } from 'recompose';
import Measure from 'react-measure';
import * as AnalyticsStore from '../../stores/analytics-store';
import * as ActiveVideoStore from '../../stores/active-video-store';
import * as selectors from './selectors';
import SpinPage from '../../components/spin-page';
import AnalyticsGraph from './AnalyticsGraph';
import ArcChart from '../../components/d3-chart';

interface AnalyticsContainerProps {
  analyticsGraph: {
    annotationsCount: {
      max: number;
      data: {
        count: number;
      }[];
    };
    pausesCount: {
      max: number;
      data: {
        count: number;
      }[];
    };
    lessonSeeks: number;
  };
  visible: boolean;
  setVisible: (visible: boolean) => void;
  size: {
    height: number;
    width: number;
  };
  setSize: (value: any) => void;
  thumbnail: {
    height: number;
    width: number;
    url: string;
    sas: string;
  };
  courseId: string;
  lessonId: string;
  isInitialized: boolean;
  duration: number;
}

const enhance = compose(
  connect(
    state => ({
      isInitialized: AnalyticsStore.selectors.isInitialized(state),
      size: AnalyticsStore.selectors.getSize(state),
      thumbnail: ActiveVideoStore.selectors.getThumbnail(state),
      duration: ActiveVideoStore.selectors.getDuration(state),
      analyticsGraph: selectors.getAnalyticsGraph(state)
    }),
    {
      setSize: AnalyticsStore.actions.setSize,
      getAnalytics: AnalyticsStore.actions.getAnalytics
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.getAnalytics(this.props.courseId, this.props.lessonId);
    }
  }),
  withState('visible', 'setVisible', false)
);

export default enhance((props: AnalyticsContainerProps) => {
  return (
    <Fragment>
      <div>
        <Button
          type="primary"
          onClick={() => {
            props.setVisible(true);
          }}
        >
          Analytics
        </Button>
        <Drawer
          title={<span>Analytics</span>}
          placement="top"
          closable={true}
          onClose={() => {
            props.setVisible(false);
          }}
          visible={props.visible}
          height={'auto'}
          style={{
            overflow: 'auto',
            overflowY: 'auto',
            height: '80vh'
          }}
        >
          {props.isInitialized && (
            <Measure
              bounds={true}
              onResize={contentRect =>
                props.setSize({
                  width: contentRect.bounds.width,
                  height: contentRect.bounds.height
                })
              }
            >
              {({ measureRef }) => (
                <div ref={measureRef} className="videx-vertical-scroll">
                  <div
                    style={{
                      height: 300,
                      position: 'relative',
                      marginBottom: 50
                    }}
                  >
                    <AnalyticsGraph
                      data={
                        props.analyticsGraph !== null ||
                        props.analyticsGraph !== undefined
                          ? props.analyticsGraph.annotationsCount.data
                          : null
                      }
                      max={
                        props.analyticsGraph !== null ||
                        props.analyticsGraph !== undefined
                          ? props.analyticsGraph.annotationsCount.max
                          : 0
                      }
                      size={props.size}
                      thumbnail={props.thumbnail}
                      name={'Annotations'}
                    />

                    <AnalyticsGraph
                      data={
                        props.analyticsGraph !== null ||
                        props.analyticsGraph !== undefined
                          ? props.analyticsGraph.pausesCount.data
                          : null
                      }
                      max={
                        props.analyticsGraph !== null ||
                        props.analyticsGraph !== undefined
                          ? props.analyticsGraph.pausesCount.max
                          : 0
                      }
                      size={props.size}
                      thumbnail={props.thumbnail}
                      name={'Pauses'}
                    />
                    {props.analyticsGraph.lessonSeeks !== 0 && <ArcChart />}
                  </div>
                </div>
              )}
            </Measure>
          )}
          {!props.isInitialized && <SpinPage />}
        </Drawer>
      </div>
    </Fragment>
  );
});
