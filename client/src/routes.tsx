import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './container/app';
import ActiveVideoPage from './pages/active-video-page';
import CourseLibraryPage from './pages/course-library-page';
import CreateCoursePage from './pages/create-course-page';
import EditCoursePage from './pages/edit-course-page';
import LessonLibraryPage from './pages/lesson-library-page';
import IdConsentPage from './pages/id-consent-page';

export const routes = () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute components={CourseLibraryPage} />
      <Route path="course/create" component={CreateCoursePage} />
      <Route path="course/:courseId" component={LessonLibraryPage} />
      <Route path="course/:id/edit" component={EditCoursePage} />
      <Route
        path="course/:courseId/lesson/:lessonId"
        component={ActiveVideoPage}
      />
      <Route path="consent/shareInfo" component={IdConsentPage} />
    </Route>
  );
};

export default routes;
