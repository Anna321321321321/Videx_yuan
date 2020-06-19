import React from 'react';
import Joyride, { STATUS, ACTIONS, EVENTS } from 'react-joyride';
import {
  compose,
  lifecycle,
  mapProps,
  withHandlers,
  withState
} from 'recompose';
import * as Logger from 'videx/client/logger';

interface FREProps {
  isEnabled: boolean;
  onStop: () => void;
  onPause: () => void;
}

interface withStateProps {
  refs: any;
  setRefs: (refs) => void;
  stepIndex: number;
  setStepIndex: (value: number) => void;
}

interface withHandlersProps {
  joyrideCallback: () => void;
}

interface mapPropsProps {
  setRefs: (ref) => void;
  joyrideCallback: () => void;
  isEnabled: boolean;
  stepIndex: number;
  setStepIndex: (value) => void;
}

const enhance = compose<mapPropsProps, FREProps>(
  withState<FREProps, any, 'refs', 'setRefs'>('refs', 'setRefs', null),
  withState('stepIndex', 'setStepIndex', 0),
  lifecycle<FREProps & withStateProps, null, null>({
    componentWillReceiveProps(nextProps) {
      if (!this.props.isEnabled && nextProps.isEnabled) {
        Logger.event('FRE.Click');
        // this.props.refs.helpers.reset();
      }
    }
  }),
  withHandlers<FREProps & withStateProps, withHandlersProps>({
    joyrideCallback: props => data => {
      const { status, action, type } = data;
      // @ts-ignore
      if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        props.onPause();
      }
      // @ts-ignore
      if ([STATUS.FINISHED, STATUS.FINISHED].includes(status)) {
        props.setStepIndex(0);
        props.onPause();
      }

      // @ts-ignore
      if ([ACTIONS.CLOSE].includes(action)) {
        props.setStepIndex(0);
        props.onPause();
      }
      // @ts-ignore
      if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
        // Update state to advance the tour
        const currentIndex = props.stepIndex;
        props.setStepIndex(currentIndex + (action === ACTIONS.PREV ? -1 : 1));
      }
    }
  }),
  mapProps<mapPropsProps, FREProps & withStateProps & withHandlersProps>(
    props => ({
      setRefs: props.setRefs,
      joyrideCallback: props.joyrideCallback,
      isEnabled: props.isEnabled,
      stepIndex: props.stepIndex,
      setStepIndex: props.setStepIndex
    })
  )
);

const backStyle = {
  color: '#4169E1'
};

const buttonStyle = content => ({
  display: content,
  color: '#FFF',
  backgroundColor: '#4169E1'
});

export default enhance((props: mapPropsProps) => (
  <Joyride
    ref={props.setRefs}
    run={props.isEnabled}
    debug={false}
    disableOverlayClose={true}
    scrollToFirstStep={true}
    steps={[
      {
        title: 'Welcome to the ViDeX tour!',
        content: (
          <div>
            This short tour will give you a preview of the learning tools ViDeX
            offers you. The tour will teach you how to navigate the interface,<br />{' '}
            share intervals, and Annotate videos.
          </div>
        ),
        target: '.videx-video-player',
        disableBeacon: true,
        placement: 'right',
        styles: {
          button: buttonStyle('next'),
          back: backStyle
        }
      },
      {
        content: (
          <div>
            Toggle between <strong>Class</strong> and <strong>Personal</strong>{' '}
            heatmaps, allowing you to spot what you missed or come back to key
            material later. <br />{' '}
            <img height="200" src="/static/fre/heatmap.gif" />
          </div>
        ),
        target: '.videx-video-heatmap-control-button',
        disableBeacon: true
      },
      {
        content: (
          <div>
            Use the filmstrip to <strong>navigate</strong>,{' '}
            <strong>annotate</strong> and <strong>share</strong> parts of the
            video. Just drag and hold click to select an interval. <br /> <br />{' '}
            <img height="200" src="/static/fre/filmstrip.gif" />
          </div>
        ),
        target: '.amp-controlbaricons-middle',
        disableBeacon: true
      },
      {
        content: (
          <div>
            Expand thumbnails to help clarify the transcript content. <br />{' '}
            <img height="200" src="/static/fre/thumbnail.gif" />
          </div>
        ),
        target: '.videx-transcript-segment',
        disableBeacon: true
      },
      {
        content: (
          <div>
            Scroll through the Transcript to annotate and share parts of the
            video. <br /> <img height="200" src="/static/fre/transcript.gif" />
          </div>
        ),
        target: '.videx-transcript',
        disableBeacon: true
      },
      {
        content: (
          <div>
            You can skip through the rest of the video and play the important
            parts you annotated using the <strong>Play Annotations</strong>{' '}
            button.
          </div>
        ),
        target: '.videx-play-annotations-plugin-decorator',
        disableBeacon: true
      },
      {
        content: (
          <div>
            Export your annotations to <strong>PDF</strong> or{' '}
            <strong>OneNote</strong>. <br />
            <br /> <img height="200" src="/static/fre/export.gif" />
          </div>
        ),
        target: '#videxExportButton',
        disableBeacon: true
      },
      {
        title: 'You are now ready to use the tools!',
        content: (
          <div>
            You have learnt how to add and play annotations, share intervals and
            navigate your video! <br />
            <br /> If you wish to go over the features again, just click the
            Start Tour button.
          </div>
        ),
        target: '.videx-joyride-tour-button',
        disableBeacon: true
      }
    ]}
    stepIndex={props.stepIndex}
    continuous={true}
    showProgress={true}
    callback={props.joyrideCallback}
    locale={{
      back: 'Back',
      close: 'Close',
      last: 'Last',
      next: 'Next',
      skip: 'Skip'
    }}
    showSkipButton={true}
    styles={{
      buttonNext: {
        backgroundColor: '#1890ff',
        borderRadius: 0,
        color: '#fff'
      },
      buttonBack: {
        color: '#1890ff',
        marginLeft: 'auto',
        marginRight: 5
      }
    }}
  />
));
