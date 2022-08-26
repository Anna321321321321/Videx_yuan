import React from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import DimmerLoader from '../../components/dimmer-loader';
import FragmentWrapper from '../../components/fragment-wrapper';
import FRE from '../../components/fre';
import ActiveVideoFooter from '../../layouts/active-video-footer';
import ActiveVideoHeader from '../../layouts/active-video-share-header';
import TranscriptShareContainer from '../transcript-share-container';
import VideoPlayerContainer from '../video-player-container';
import _ from 'lodash';

export interface ActiveVideoShareContainerProps {
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
  isFilmstripMode: boolean;
  controlFilmstripMode: () => void;
  playlistName: string;
  playlists: any[];
  lessonId: string;
  courseId: string;
  link: string;
  history: any;
  annotations: [];
  thumbnail: {
    url: string;
    sas: string;
    height: number;
    width: number;
  };
  pauseVideo: () => void;
  userType: number;
}

export default (props: ActiveVideoShareContainerProps) => {
  return (
    <div className="videx-active-video-container">
      <ActiveVideoHeader
        lessonName={props.lessonName}
        onClickFRE={props.enableFRE}
        courseId={props.courseId}
        playlists={props.playlists}
        lessonId={props.lessonId}
        playlistName={props.playlistName}
        history={props.history}
        annotations={props.annotations}
        thumbnail={props.thumbnail}
        pauseVideo={props.pauseVideo}
        userType={props.userType}
      />
      <FRE
        isEnabled={props.isFREEnabled}
        onPause={props.pauseFRE}
        onStop={props.disableFRE}
      />
      <ReflexContainer orientation="vertical">
        <ReflexElement
          flex={props.layoutFlexs.player}
          name="player"
          className="videx-video-player"
          onResize={_.debounce((event) => props.onResize(event), 400)}
        >
          <VideoPlayerContainer />
        </ReflexElement>
        <ReflexSplitter />
        <ReflexElement
          flex={props.layoutFlexs.transcript}
          className="videx-transcript"
          name="transcript"
          onResize={_.debounce((event) => props.onResize(event), 400)}
        >
          <TranscriptShareContainer
            link={props.link}
            annotations={props.annotations}
          />
        </ReflexElement>
      </ReflexContainer>
      <ActiveVideoFooter />
    </div>
  );
};
