import { Layout } from 'antd';
import React from 'react';
import ActiveVideoShareContainer from '../../container/active-video-share-container';
import APICaller from '../../system/api-caller';

// APICaller.get(
//   `/api/v4/courses/:${this.props.params.courseId}/lessons/:${this.props.params.lessonId}/${this.props.params.links}`,
//   (payload) => {
//     const link = payload.link;
//   }
// );

export default (props) => (
  <Layout
    style={{
      minHeight: '100vh',
      maxHeight: '100vh',
    }}
  >
    <ActiveVideoShareContainer
      lessonId={props.params.lessonId}
      courseId={props.params.courseId}
      history={props.history}
      link={props.params.link}
    />
  </Layout>
);
