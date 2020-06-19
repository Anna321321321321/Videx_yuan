import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Observable } from 'rxjs/Observable';
import * as ActiveVideoStore from '../../../stores/active-video-store';

interface MiniVideoPlayerProps {
  streamingUrl: string;
  loadeddata: (player: any) => void;
  timeupdate: (time: number) => void;
  currentTime: (value: number) => void;
  annotationStartTime: number;
  startTime: (value: number) => void;
  annotationEndTime: number;
  setVideoMode: (value: boolean) => void;
}

class MiniVideoPlayer extends Component<MiniVideoPlayerProps, any> {
  videoPlayer: any;
  videoNode2: HTMLElement;

  componentDidMount() {
    this.videoPlayer = amp(
      this.videoNode2,
      {
        /* Options */
        autoplay: true,
        playbackSpeed: {
          enabled: false,
          initialSpeed: 1
        },
        controls: true,
        fluid: true
      },
      () => {
        this.videoPlayer.volume(0.5);
        // timeupdate event handlers

        this.videoPlayer.on('loadeddata', () => {
          this.videoPlayer.currentTime(this.props.annotationStartTime);
        });
        const timeupdate = Observable.fromEvent(
          this.videoPlayer,
          'timeupdate'
        ).map(() => this.videoPlayer.currentTime());
        timeupdate
          .map(value => parseInt(value, 10))
          .distinctUntilChanged()
          .subscribe(value => {
            if (value > this.props.annotationEndTime) {
              this.videoPlayer.currentTime(this.props.annotationStartTime);
              this.videoPlayer.pause();
              this.props.setVideoMode(false);
            }
          });
      }
    );

    this.videoPlayer.getChild('controlBar').removeChild('progressControl');
    this.videoPlayer.getChild('controlBar').removeChild('durationDisplay');
    this.videoPlayer.getChild('controlBar').removeChild('currentTimeDisplay');
    this.videoPlayer.src([
      {
        src: this.props.streamingUrl,
        type: 'application/vnd.ms-sstr+xml'
      }
    ]);
  }

  componentWillUnmount() {
    if (this.videoPlayer) {
      this.videoPlayer.dispose();
    }
  }

  render() {
    return (
      <div className="videx-mini-player-container">
        <video
          ref={(node: HTMLElement) => (this.videoNode2 = node)}
          className="azuremediaplayer amp-flush-skin"
          style={{
            height: '200px',
            width: '300px',
            outline: 'none'
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  streamingUrl: ActiveVideoStore.selectors.getStreamingUrl(state)
});

export default connect(
  mapStateToProps,
  null
)(MiniVideoPlayer);
