import React from 'react';
import { Link } from 'react-router';
import { Header, Menu } from 'semantic-ui-react';
import { Button, Dropdown } from 'antd';
import * as Logger from 'videx/client/logger';
import UserContainer from '../../container/user-container';
import PlaylistContainer from '../../container/active-video-playlist-container';
import AnnotationsContainer from '../../container/active-video-annotations-share-container';
import AnalyticsContainer from '../../container/analytics-container';
import ShareListContainer from '../../container/share-list-container';
import DoneButtonContainer from '../../container/done-button-container';
interface ActiveVideoHeaderProps {
  lessonName: string;
  onClickFRE: () => void;
  courseId: string;
  lessonId: string;
  playlistName: string;
  playlists: {
    _id: string;
    lessons: { _id: string; preview: string; duration: string; name: string }[];
    name: string;
  }[];
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

const renderAnalytics = (userType) => {
  if (userType === 1 || userType === 2) {
    return true;
  }
  return false;
};
export default (props: ActiveVideoHeaderProps) => {
  return (
    <Menu
      borderless={true}
      size="small"
      style={{
        marginTop: '0px',
        marginBottom: '0px',
        height: '50px',
      }}
    >
      <Menu.Item key={0}>
        <Link
          className="videx-active-video-header-logo"
          to="/"
          onClick={() => Logger.event('App.Home.Click')}
        >
          <img
            className="videx-active-video-header-logo-img"
            alt="logo"
            src="/static/logo.png"
          />
          <span className="videx-active-video-header-logo-span">ViDeX</span>
        </Link>
      </Menu.Item>
      <Menu.Item key={1}>
        <Header>{props.lessonName}</Header>
      </Menu.Item>
      <Menu.Item key={2}>
        <Button
          type="primary"
          className="videx-joyride-tour-button"
          onClick={props.onClickFRE}
        >
          Start Tour
        </Button>
      </Menu.Item>
      <Menu.Item key={3}>
        <AnnotationsContainer
          annotations={props.annotations}
          thumbnail={props.thumbnail}
          pauseVideo={props.pauseVideo}
        />
      </Menu.Item>
      {props.playlists.length > 0 && (
        <Menu.Item key={4}>
          <PlaylistContainer
            history={props.history}
            courseId={props.courseId}
            playlists={props.playlists}
            lessonId={props.lessonId}
            playlistName={props.playlistName}
          />
        </Menu.Item>
      )}
      <Menu.Item key={5}>
        <ShareListContainer />
      </Menu.Item>
      <Menu.Item key={6}>
        {renderAnalytics(props.userType) && (
          <AnalyticsContainer
            courseId={props.courseId}
            lessonId={props.lessonId}
          />
        )}
      </Menu.Item>
      <Menu.Item position="right" key={7}>
        {/* <Button
          type="primary"
          className="select-done-button"
          onClick={props.onClickFRE}
        >
          Done
        </Button> */}
        <DoneButtonContainer />
      </Menu.Item>
      <Menu.Item position="right" key={8}>
        <UserContainer />
      </Menu.Item>
    </Menu>
  );
};
