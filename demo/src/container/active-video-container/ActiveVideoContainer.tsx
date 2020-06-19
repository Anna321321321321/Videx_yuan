import React from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import DimmerLoader from '../../components/dimmer-loader';
import FragmentWrapper from '../../components/fragment-wrapper';
import FRE from '../../components/fre';
import ActiveVideoFooter from '../../layouts/active-video-footer';
import ActiveVideoHeader from '../../layouts/active-video-header';
import TranscriptContainer from '../transcript-container';
import VideoPlayerContainer from '../video-player-container';
import _ from 'lodash';

export interface ActiveVideoContainerProps {
  isReady: boolean;
  lessonName: string;
  isFREEnabled: boolean;
  enableFRE: () => void;
  pauseFRE: () => void;
  disableFRE: () => void;
  layoutFlexs: {
    transcript: number;
    player: number;
    filmstrip: number;
  };
  onResize: (event: any) => void;
}

export default (props: ActiveVideoContainerProps) => {
  return (
    <div className="videx-active-video-container">
      <FragmentWrapper>
        <DimmerLoader active={!props.isReady} />
        <FRE
          isEnabled={props.isFREEnabled}
          onPause={props.pauseFRE}
          onStop={props.disableFRE}
        />
      </FragmentWrapper>
      <ActiveVideoHeader
        lessonName={props.lessonName}
        onClickFRE={props.enableFRE}
      />
      <ReflexContainer orientation="vertical">
        <ReflexElement
          flex={props.layoutFlexs.player}
          name="player"
          className="videx-video-player"
          onResize={_.debounce(event => props.onResize(event), 400)}
        >
          <VideoPlayerContainer />
        </ReflexElement>
        <ReflexSplitter />
        <ReflexElement
          flex={props.layoutFlexs.transcript}
          className="videx-transcript"
          name="transcript"
          onResize={_.debounce(event => props.onResize(event), 400)}
        >
          <TranscriptContainer />
        </ReflexElement>
      </ReflexContainer>
      <ActiveVideoFooter />
    </div>
  );
};
