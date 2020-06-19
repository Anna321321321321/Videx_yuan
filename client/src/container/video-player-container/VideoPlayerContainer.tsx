import { notification } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Observable } from 'rxjs/Observable';
import * as Logger from 'videx/client/logger';
import '../../decorators/video-player/playback-skip-decorator';
import '../../decorators/video-player/control-bar-decorator';
import '../../decorators/video-player/filmstrip-display-decorator';
import '../../decorators/video-player/heatmap-control-decorator';
import '../../decorators/video-player/library-link-decorator';
import '../../decorators/video-player/unmute-decorator';
import '../../decorators/video-player/play-annotations-decorator';
import * as ActiveVideoStore from '../../stores/active-video-store';
import * as VideoPlayerStore from '../../stores/video-player-store';

interface VideoPlayerProps {
  streamingUrl: string;
  captionsUrl: string;
  loadeddata: (player: any) => void;
  timeupdate: (time: number) => void;
  setDuration: (duration: number) => void;
  toggleVideoStatus: (value: string) => void;
}

class VideoPlayerContainer extends Component<VideoPlayerProps, any> {
  videoPlayer: any;
  videoNode: HTMLElement;

  componentDidMount() {
    this.videoPlayer = amp(
      this.videoNode,
      {
        autoplay: false,
        playbackSpeed: {
          enabled: true,
          initialSpeed: 1,
          speedLevels: [
            { name: '2.0x', value: 2.0 },
            { name: '1.5x', value: 1.5 },
            { name: '1.4x', value: 1.4 },
            { name: '1.3x', value: 1.3 },
            { name: '1.2x', value: 1.2 },
            { name: '1.1x', value: 1.1 },
            { name: '1.0x', value: 1.0 },
            { name: '0.5x', value: 0.5 }
          ]
        },
        controls: true
      },
      () => {
        this.videoPlayer.volume(0.5);

        // add event listener to handle click on video player and seek
        document
          .getElementsByClassName('vjs-mouse-display')[0]
          .addEventListener(
            'click',
            () => Logger.event('ActiveVideo.Click', { source: 'player' }),
            true
          );

        // timeupdate event handlers
        const timeupdate = Observable.fromEvent(
          this.videoPlayer,
          'timeupdate'
        ).map(() => this.videoPlayer.currentTime());

        // seeking event handlers
        const seeking = Observable.fromEvent(this.videoPlayer, 'seeking').map(
          () => this.videoPlayer.currentTime()
        );
        // because we have auto play, therefore, we should skip the first event.
        const play = Observable.fromEvent(this.videoPlayer, 'play').skip(1);
        const pause = Observable.fromEvent(this.videoPlayer, 'pause');
        seeking.withLatestFrom(timeupdate).subscribe(value => {
          Logger.event('Player.Seeking', {
            start: value[1],
            end: value[0]
            // TODO: NEED UPDATE
            // annotated: this.props.annotated(value[0])
          });
        });

        play.filter(() => !this.videoPlayer.seeking()).subscribe(() => {
          this.props.toggleVideoStatus('playing');
          Logger.event('Player.Play');
        });

        pause.filter(() => !this.videoPlayer.seeking()).subscribe(() => {
          this.props.toggleVideoStatus('paused');
          Logger.event('Player.Pause');
        });

        timeupdate
          .do(value => {
            // update current caption content
            const activeCues = this.videoPlayer.textTracks().tracks_[0]
              .activeCues_;
            if (activeCues.length > 0) {
              activeCues[0].displayState.firstChild.innerHTML =
                activeCues[0].text;
            }
            // display captions after updating
            document
              .getElementsByClassName('vjs-text-track-display')[0]
              .classList.remove('hide-text-track');
          })
          .map(value => parseInt(value, 10))
          .distinctUntilChanged()
          .subscribe(value => this.props.timeupdate(value));

        this.videoPlayer.on('loadeddata', () => {
          this.props.loadeddata(this.videoPlayer);
          this.props.setDuration(this.videoPlayer.duration());

          const re = new RegExp('<math>(.*?)</math>');
          const track = this.videoPlayer.textTracks()[0];
          const cues = track.cues;
          for (let i = 0; i < track.cues.length; i++) {
            const cue = cues[i];
            const mathCheck = re.exec(cue.text);
            //check if <math> exists in the sentence/paragraph
            if (mathCheck !== null) {
              const cueTextArray = cue.text.split(' ');
              for (let j = 0; j < cueTextArray.length; j++) {
                const mathEquation = re.exec(cueTextArray[j]);

                //if math equation exists for word convert to katex and update array
                if (mathEquation !== null) {
                  try {
                    const newCaptionsValue = cueTextArray[j].replace(
                      re,
                      // @ts-ignore
                      katex.renderToString(mathEquation[1])
                    );
                    cueTextArray[j] = newCaptionsValue;
                  } catch (e) {
                    notification.error({
                      message: 'Filmstrip Error',
                      description:
                        'Could not parse Math formula. Please inform your instructor about this issue!'
                    });
                  }
                }
              }

              //create string from array
              cue.text = cueTextArray.join(' ');
            }
          }

          // listen for cuechange and hide track display
          Observable.fromEvent(track, 'cuechange').subscribe(() => {
            document
              .getElementsByClassName('vjs-text-track-display')[0]
              .classList.add('hide-text-track');
          });
        });

        this.videoPlayer.on('fullscreenchange', () =>
          Logger.event('Player.FullScreen', {
            fullScreen: this.videoPlayer.isFullscreen()
          })
        );

        this.videoPlayer.on('ratechange', () => {
          if (this.videoPlayer.playbackRate() > 1) {
            Logger.event('Player.RateChanged.Faster', {
              rate: this.videoPlayer.playbackRate()
            });
          } else {
            Logger.event('Player.RateChanged.Slower', {
              rate: this.videoPlayer.playbackRate()
            });
          }
        });
      }
    );
    this.videoPlayer.src(
      [
        {
          src: this.props.streamingUrl,
          type: 'application/vnd.ms-sstr+xml'
        }
      ],
      [
        {
          src: this.props.captionsUrl,
          srclang: 'en',
          kind: 'captions',
          label: 'English'
        }
      ]
    );

    this.videoPlayer
      .getChild('controlBar')
      .getChild('progressControl')
      .addChild('FilmstripDisplayDecorator', {});
    this.videoPlayer.addChild('PlaybackSkipDecorator', {});
    this.videoPlayer.addChild('VideoPlayerHeatmapControlDecorator', {});
    this.videoPlayer.addChild('PlayAnnotationsPluginDecorator', {});
    this.videoPlayer.addChild('VideoPlayerControlBarDecorator', {});
    this.videoPlayer.addChild('VideoPlayerLibraryLinkDecorator', {});
    this.videoPlayer.addChild('VideoPlayerUnmuteDecorator', {});
  }

  componentWillUnmount() {
    if (this.videoPlayer) {
      this.videoPlayer.dispose();
    }
  }

  render() {
    return (
      <div className="videx-video-player-container">
        <video
          ref={(node: HTMLElement) => (this.videoNode = node)}
          className="azuremediaplayer amp-flush-skin"
          style={{
            height: '100%',
            width: '100%',
            outline: 'none'
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  streamingUrl: ActiveVideoStore.selectors.getStreamingUrl(state),
  captionsUrl: ActiveVideoStore.selectors.getCaptionFile(state)
});

const mapDispatchToProps = {
  loadeddata: VideoPlayerStore.actions.loadeddata,
  timeupdate: VideoPlayerStore.actions.timeupdate,
  setDuration: ActiveVideoStore.actions.setDuration,
  toggleVideoStatus: VideoPlayerStore.actions.toggleVideoStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayerContainer);
