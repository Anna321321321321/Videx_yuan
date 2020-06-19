import React, { Component, Fragment } from 'react';
import { Button, Card, Drawer } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router';
import moment from 'moment';
import * as Logger from 'videx/client/logger';

interface PlaylistContainerProps {
  courseId: string;
  lessonId: string;
  playlistName: string;
  history;
  playlists: {
    _id: string;
    lessons: { _id: string; preview: string; duration: string; name: string }[];
    name: string;
  }[];
}

export default class PlaylistContainer extends Component<any, any> {
  state = { visible: false };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.visible != this.state.visible) {
      const element = document.getElementById('videx-current-lesson');
      element.scrollIntoView();
    }
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const filteredPlaylist = _.find(
      this.props.playlists,
      item => item.name === this.props.playlistName
    );
    return (
      <Fragment>
        {filteredPlaylist !== undefined && (
          <div>
            <Button
              type="primary"
              onClick={() => {
                Logger.event('Playlist.Button.Click');
                this.showDrawer();
              }}
            >
              Playlist
            </Button>
            <Drawer
              title={
                filteredPlaylist.name === 'default'
                  ? 'All Lessons'
                  : filteredPlaylist.name
              }
              placement="top"
              closable={true}
              onClose={this.onClose}
              visible={this.state.visible}
              height={'auto'}
            >
              <div className="videx-scroll">
                {filteredPlaylist.lessons.map((item, idx) => {
                  return (
                    <span
                      key={idx}
                      style={{ borderColor: 'blue' }}
                      onMouseOver={() => {
                        Logger.event('Playlist.Video.Hover', {
                          playlistLessonId: item._id
                        });
                      }}
                    >
                      <Link
                        to={`/course/${this.props.courseId}/lesson/${item._id}`}
                        onClick={() => {
                          this.props.history.push(
                            `/course/${this.props.courseId}/lesson/${item._id}`
                          );
                          if (this.props.lessonId !== item._id) {
                            Logger.event('Playlist.Video.Click', {
                              playlistLessonId: item._id
                            });
                          }
                        }}
                      >
                        <Card
                          className="videx-playlist-card"
                          key={idx}
                          cover={
                            <span style={{ position: 'relative' }}>
                              <span
                                className="videx-lesson-card-image"
                                style={{ content: `url(${item.preview})` }}
                              />
                              {this.props.lessonId === item._id && (
                                <span
                                  className="videx-lesson-card-watching"
                                  id="videx-current-lesson"
                                >
                                  Currently Watching
                                </span>
                              )}
                              {item.duration !== null &&
                                this.props.lessonId !== item._id && (
                                  <span className="videx-lesson-card-duration">
                                    {item.duration}
                                  </span>
                                )}
                            </span>
                          }
                        >
                          <Card.Meta
                            title={item.name}
                            description={
                              <p>
                                {moment(item.releaseDate).format(
                                  'dddd, MMMM Do YYYY'
                                )}
                              </p>
                            }
                          />
                        </Card>
                      </Link>
                    </span>
                  );
                })}
              </div>
            </Drawer>
          </div>
        )}
      </Fragment>
    );
  }
}
